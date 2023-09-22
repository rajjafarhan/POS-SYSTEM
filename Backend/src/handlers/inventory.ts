import { database_connection } from '../db'


//////////////////////////////////////CREATE INVENTORY//////////////////////////////////////

export const createInventory = async (req, res) => {
    const inventoryCollection = await database_connection(['inventory']);
    const {addToWebsite,category,name,qty,unitPrice,imgUrl}=req.body;
    const userId=req.user.id;

}