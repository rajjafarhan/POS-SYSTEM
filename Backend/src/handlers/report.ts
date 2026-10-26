import { ObjectId } from "mongodb";
import { database_connection } from "../db";

//////////////////////////////////////SALES CLOSING REPORT//////////////////////////////////////
// Returns every sale/purchase invoice and customer return from `from` up to now (not just up to `to`),
// so the frontend can work back from today's stock to the opening stock of the period.
// All grouping by day/week/month happens on the frontend, in the user's timezone.

export const getClosingReport = async (req, res) => {
  try {
    const from = new Date(String(req.query.from));
    const to = new Date(String(req.query.to));
    if (isNaN(from.getTime()) || isNaN(to.getTime()) || from > to) {
      return res.status(400).json({ message: "Invalid date range" });
    }
    const userId = req.user.id;
    const [saleCol, purchaseCol, inventoryCol, shopCol, returnCol] =
      await database_connection([
        "customer invoice",
        "vendor invoice",
        "inventory",
        "shops",
        "customer returns",
      ]);

    const [sales, purchases, inventory, shop, returns] = await Promise.all([
      saleCol.find({ userId, date: { $gte: from } }).sort({ date: 1 }).toArray(),
      purchaseCol
        .find({ userId, date: { $gte: from } })
        .sort({ date: 1 })
        .toArray(),
      inventoryCol.find({ userId }).toArray(),
      shopCol.findOne(
        { _id: new ObjectId(userId) },
        { projection: { shopName: 1, name: 1, shopAdd: 1, contactNo: 1 } },
      ),
      returnCol.find({ userId, date: { $gte: from } }).sort({ date: 1 }).toArray(),
    ]);

    return res.status(200).json({
      from,
      to,
      generatedAt: new Date(),
      shop,
      sales,
      purchases,
      returns,
      inventory,
    });
  } catch (error) {
    console.error("Error building closing report:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
