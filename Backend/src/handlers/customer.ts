import { database_connection } from "../db";

///////////////////////////////////////////////////////get all customers

export const getAllCustomers = async (req, res) => {
  try {
    const custCollection = await database_connection(["customer invoice"]);
    const setNo = parseInt(req.params.setNo);
    const itemsPerPage = 50;

    if (setNo < 1) {
      return res.status(400).json({ error: "Invalid set number" });
    }

    const skip = (setNo - 1) * itemsPerPage;

    const customers = await custCollection[0]
      .aggregate([
        { $match: { userId: req.user.id } },
        { $sort: { date: -1 } },
        { $skip: skip },
        { $limit: itemsPerPage }, // Limit to the current set of vendors
      ])
      .toArray();
    const totalCustomerCount = await custCollection[0].countDocuments({
      userId: req.user.id,
    });

    if (customers.length === 0) {
      console.log("no customer found");
      return res.status(404).json({ message: "No vendors found for this set" });
    }

    return res
      .status(200)
      .json({ customers: customers, totalCount: totalCustomerCount });
  } catch (error) {
    console.error("Error fetching customer invoices:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

/////////////////////////////////////////////////CREATE CUSTOMER////////////////////////////
export const createCustomer = async (req, res) => {
  try {
    const custCollection = await database_connection(["customer invoice"]);
    const { cash, change, date, product, rDesc, rName, total } = req.body;
    const userId = req.user.id;
    const custData = {
      userId: userId,
      cash: cash,
      change: change,
      date: new Date(date),
      product: product,
      rDesc: rDesc,
      rName: rName,
      total: total,
    };

    const result = await custCollection[0].insertOne(custData);
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
    const custCollection = await database_connection(["customer invoice"]);
    const result = await custCollection[0].deleteOne({ _id: req.params.id });

    if (result.deletedCount === 1) {
      return res.status(200).json({ message: "Customer deleted successfully" });
    } else {
      return res.status(404).json({ error: "Customer not found" });
    }
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
