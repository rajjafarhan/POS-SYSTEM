import { ObjectId } from "mongodb";
import { database_connection } from "../db";

//////////////////////////////////////BULK DELETE//////////////////////////////////////
// POST { ids: [...] } deletes the selected receipts of the logged-in shop only.

export const deleteManyFrom = (collectionName) => async (req, res) => {
  try {
    const ids = Array.isArray(req.body?.ids) ? req.body.ids : [];
    const objectIds = ids
      .filter((id) => ObjectId.isValid(String(id)))
      .map((id) => new ObjectId(String(id)));
    if (objectIds.length === 0) {
      return res.status(400).json({ message: "Nothing selected" });
    }
    const [col] = await database_connection([collectionName]);
    const result = await col.deleteMany({ _id: { $in: objectIds }, userId: req.user.id });
    return res.status(200).json({ deleted: result.deletedCount });
  } catch (error) {
    console.error(`Error bulk deleting from ${collectionName}:`, error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
