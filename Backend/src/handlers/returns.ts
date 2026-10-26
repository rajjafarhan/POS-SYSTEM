import { ObjectId } from "mongodb";
import { database_connection } from "../db";

//////////////////////////////////////SALES RETURNS//////////////////////////////////////
// A return is recorded against a customer invoice: which items came back, how many,
// the refund amount and why. Returned quantities go back into inventory.

const num = (v) => {
  const n = Number(v);
  return isFinite(n) ? n : 0;
};

// Unit price the customer actually paid for an invoice line (negotiated price if any).
const paidUnitPrice = (item) => {
  const qty = num(item?.productQty);
  if (item?.unitPrice !== undefined && item?.unitPrice !== "") return num(item.unitPrice);
  if (qty && num(item?.totalPrice)) return num(item.totalPrice) / qty;
  return num(item?.product?.sellingPrice);
};

// How many of each invoice line (by index) have already been returned.
const returnedByLine = (returns) => {
  const m = new Map();
  returns.forEach((r) =>
    (r.items ?? []).forEach((it) => m.set(it.line, (m.get(it.line) ?? 0) + num(it.qty))),
  );
  return m;
};

//////////////////////////////////////////////CREATE A RETURN////////////////////////////
export const createReturn = async (req, res) => {
  try {
    const userId = req.user.id;
    const { invoiceId, items, reason, date } = req.body;
    if (!ObjectId.isValid(String(invoiceId)) || !Array.isArray(items)) {
      return res.status(400).json({ message: "Invalid return" });
    }
    const [invoiceCol, returnCol, inventoryCol] = await database_connection([
      "customer invoice",
      "customer returns",
      "inventory",
    ]);
    const invoice = await invoiceCol.findOne({ _id: new ObjectId(String(invoiceId)), userId });
    if (!invoice) {
      return res.status(404).json({ message: "Invoice not found" });
    }
    const lines = Array.isArray(invoice.product) ? invoice.product : [];
    const already = returnedByLine(await returnCol.find({ userId, invoiceId: String(invoiceId) }).toArray());

    const returnItems = [];
    for (const it of items) {
      const line = Number(it?.line);
      const qty = num(it?.qty);
      if (qty <= 0) continue;
      const sold = lines[line];
      if (!sold) {
        return res.status(400).json({ message: "Unknown item in return" });
      }
      const left = num(sold.productQty) - (already.get(line) ?? 0);
      if (qty > left) {
        return res
          .status(400)
          .json({ message: `Only ${left} of ${sold?.product?.label ?? "this item"} can be returned` });
      }
      const unitPrice = paidUnitPrice(sold);
      returnItems.push({
        line,
        product: {
          _id: sold?.product?._id,
          label: sold?.product?.label,
          category: sold?.product?.category,
          costPrice: sold?.product?.costPrice,
          sellingPrice: sold?.product?.sellingPrice,
        },
        qty,
        unitPrice,
        amount: unitPrice * qty,
      });
    }
    if (returnItems.length === 0) {
      return res.status(400).json({ message: "Choose at least one item to return" });
    }

    const parsed = date ? new Date(date) : new Date();
    const doc = {
      userId,
      invoiceId: String(invoiceId),
      invoiceDate: invoice.date,
      rName: invoice.rName ?? "",
      date: isNaN(parsed.getTime()) ? new Date() : parsed,
      items: returnItems,
      total: returnItems.reduce((s, it) => s + it.amount, 0),
      reason: reason ?? "",
      createdAt: new Date(),
    };
    await returnCol.insertOne(doc);

    // put the returned stock back
    await Promise.all(
      returnItems
        .filter((it) => ObjectId.isValid(String(it.product._id)))
        .map((it) =>
          inventoryCol.updateOne(
            { userId, _id: new ObjectId(String(it.product._id)) },
            { $inc: { qty: it.qty } },
          ),
        ),
    );
    return res.status(201).json({ message: "Return recorded", return: doc });
  } catch (error) {
    console.error("Error creating return:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

//////////////////////////////////////////////LIST RETURNS////////////////////////////
// ?invoiceId=... returns only that invoice's returns (used by the return form).
export const getReturns = async (req, res) => {
  try {
    const userId = req.user.id;
    const [returnCol] = await database_connection(["customer returns"]);
    const filter: any = { userId };
    if (req.query.invoiceId) filter.invoiceId = String(req.query.invoiceId);
    const returns = await returnCol.find(filter).sort({ date: -1 }).limit(500).toArray();
    return res.status(200).json({ returns });
  } catch (error) {
    console.error("Error fetching returns:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

//////////////////////////////////////////////DELETE A RETURN////////////////////////////
// Undo a return entered by mistake: the stock that was put back is taken out again.
export const deleteReturn = async (req, res) => {
  try {
    const userId = req.user.id;
    if (!ObjectId.isValid(String(req.params.id))) {
      return res.status(400).json({ message: "Invalid return" });
    }
    const [returnCol, inventoryCol] = await database_connection(["customer returns", "inventory"]);
    const doc = await returnCol.findOneAndDelete({ _id: new ObjectId(String(req.params.id)), userId });
    if (!doc) {
      return res.status(404).json({ message: "Return not found" });
    }
    await Promise.all(
      (doc.items ?? [])
        .filter((it) => ObjectId.isValid(String(it?.product?._id)))
        .map((it) =>
          inventoryCol.updateOne(
            { userId, _id: new ObjectId(String(it.product._id)) },
            { $inc: { qty: -num(it.qty) } },
          ),
        ),
    );
    return res.status(200).json({ message: "Return deleted" });
  } catch (error) {
    console.error("Error deleting return:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
