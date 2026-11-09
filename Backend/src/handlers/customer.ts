import { ObjectId } from "mongodb";
import { database_connection } from "../db";

const num = (v) => {
  const n = Number(v);
  return isFinite(n) ? n : 0;
};

///////////////////////////////////////////////////////get all customers

export const getAllCustomers = async (req, res) => {
  try {
    const custCollection = await database_connection(["customer invoice"]);
    const setNo = parseInt(req.params.setNo);
    const query = req.params.query;
    const itemsPerPage = 50;
    // ?status=unpaid lists only receipts that still have money due
    const unpaid = req.query.status === "unpaid" ? { balance: { $gt: 0 } } : {};

    if (setNo < 1) {
      return res.status(400).json({ error: "Invalid set number" });
    }

    const skip = (setNo - 1) * itemsPerPage;
    if (query === "aisPsqSjMUDTj387Ol") {
      const customers = await custCollection[0]
        .aggregate([
          { $match: { userId: req.user.id, ...unpaid } },
          { $sort: { date: -1 } },
          { $skip: skip },
          { $limit: itemsPerPage }, // Limit to the current set of vendors
        ])
        .toArray();
      const totalCustomerCount = await custCollection[0].countDocuments({
        userId: req.user.id,
        ...unpaid,
      });

      if (customers.length === 0) {
        console.log("no customer found");
        return res
          .status(404)
          .json({ message: "No vendors found for this set" });
      }

      return res
        .status(200)
        .json({ customers: customers, totalCount: totalCustomerCount });
    } else {
      const customers = await custCollection[0]
        .find({ $text: { $search: query }, userId: req.user.id, ...unpaid })
        .sort({ date: -1 })
        .limit(itemsPerPage)
        .skip(skip)
        .toArray();
      const totalCustomerCount = await custCollection[0].countDocuments({
        $text: { $search: query },
        userId: req.user.id,
        ...unpaid,
      });

      if (customers.length === 0) {
        return res
          .status(404)
          .json({ message: "No vendors found for this set" });
      }

      return res
        .status(200)
        .json({ customers: customers, totalCount: totalCustomerCount });
    }
  } catch (error) {
    console.error("Error fetching customer invoices:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

/////////////////////////////////////////////////CREATE CUSTOMER////////////////////////////
export const createCustomer = async (req, res) => {
  try {
    const custCollection = await database_connection([
      "customer invoice",
      "inventory",
    ]);
    const { cash, change, date, product, rDesc, rName, total } = req.body;
    const userId = req.user.id;
    console.log(product);
    // The browser sends the picked day with the current local time; keep it as is.
    // (Rebuilding it from toDateString() on the server, which runs in UTC, moved
    // receipts made in Pakistan to the previous day.)
    const parsed = new Date(date);
    const receiptDate = isNaN(parsed.getTime()) ? new Date() : parsed;
    // Part payment (udhaar): cash left empty means paid in full; less than the
    // total is recorded as a first payment and the rest stays due.
    const billTotal = num(total);
    const paidNow = cash === "" || cash === undefined || cash === null ? billTotal : Math.min(num(cash), billTotal);
    const custData = {
      userId: userId,
      cash: cash,
      change: change,
      date: receiptDate,
      product: product,
      rDesc: rDesc,
      rName: rName,
      total: total,
      payments: paidNow > 0 ? [{ amount: paidNow, date: receiptDate, note: "At purchase" }] : [],
      amountPaid: paidNow,
      balance: Math.max(0, billTotal - paidNow),
    };

    const result = await custCollection[0].insertOne(custData);
    product.forEach(async (prod) => {
      await custCollection[1].updateOne(
        {
          userId,
          _id: new ObjectId(`${prod?.product?._id}`),
        },
        {
          $inc: {
            qty: Number(prod?.productQty) * -1,
          },
        },
      );
    });
    if (result.acknowledged === true) {
      return res
        .status(201)
        .json({ message: "Customer invoice created successfully" });
    } else {
      return res.status(500).json({ error: "Internal Server Error" });
    }
  } catch (error) {
    console.error("Error occurred:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

//////////////////////////////////////////////DELETE A CUSTOMER////////////////////////////

export const deleteCustomer = async (req, res) => {
  try {
    const id = new ObjectId(`${req.params.id}`);
    const custCollection = await database_connection(["customer invoice"]);
    const result = await custCollection[0].findOneAndDelete({ _id: id, userId: req.user.id });

    if (!result) {
      return res.status(404).json({ message: "Customer not found" });
    }

    return res.status(200).json({ message: "Customer deleted successfully" });
  } catch (error) {
    console.error("Error deleting customer:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

//////////////////////////////////////////////DELETE ALL CUSTOMERS////////////////////////////

export const deleteAllCustomers = async (req, res) => {
  try {
    const custCollection = await database_connection(["customer invoice"]);
    const result = await custCollection[0].deleteMany({ userId: req.user.id });
    if (result.deletedCount >= 1) {
      return res
        .status(200)
        .json({ message: "All customers deleted successfully" });
    } else {
      return res.status(404).json({ error: "No customers found" });
    }
  } catch (error) {
    console.error("Error deleting customers:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

//////////////////////////////////////////////RECORD A PAYMENT////////////////////////////
// Adds a later payment to a receipt that was paid in part (udhaar).
export const addPayment = async (req, res) => {
  try {
    const userId = req.user.id;
    if (!ObjectId.isValid(String(req.params.id))) {
      return res.status(400).json({ message: "Invalid receipt" });
    }
    const [invoiceCol] = await database_connection(["customer invoice"]);
    const _id = new ObjectId(String(req.params.id));
    const invoice = await invoiceCol.findOne({ _id, userId });
    if (!invoice) {
      return res.status(404).json({ message: "Receipt not found" });
    }
    // receipts made before this feature have no balance: they were paid in full
    const balance = num(invoice.balance);
    const amount = Math.round(num(req.body?.amount) * 100) / 100;
    if (amount <= 0) {
      return res.status(400).json({ message: "Enter an amount more than 0" });
    }
    if (amount > balance) {
      return res.status(400).json({ message: `Only Rs ${balance} is due on this receipt` });
    }
    const parsed = req.body?.date ? new Date(req.body.date) : new Date();
    const payment = {
      amount,
      date: isNaN(parsed.getTime()) ? new Date() : parsed,
      note: String(req.body?.note ?? "").slice(0, 200),
    };
    const updated = await invoiceCol.findOneAndUpdate(
      { _id, userId, balance: { $gte: amount } },
      { $push: { payments: payment }, $inc: { amountPaid: amount, balance: -amount } },
      { returnDocument: "after" },
    );
    if (!updated) {
      return res.status(409).json({ message: "The balance changed, please try again" });
    }
    return res.status(200).json({ message: "Payment recorded", invoice: updated });
  } catch (error) {
    console.error("Error recording payment:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

//////////////////////////////////////////////OUTSTANDING (UDHAAR)////////////////////////////
// Total still owed by customers, and on how many receipts.
export const getOutstanding = async (req, res) => {
  try {
    const [invoiceCol] = await database_connection(["customer invoice"]);
    const [row] = await invoiceCol
      .aggregate([
        { $match: { userId: req.user.id, balance: { $gt: 0 } } },
        { $group: { _id: null, total: { $sum: "$balance" }, count: { $sum: 1 } } },
      ])
      .toArray();
    return res.status(200).json({ total: row?.total ?? 0, count: row?.count ?? 0 });
  } catch (error) {
    console.error("Error fetching outstanding balance:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
