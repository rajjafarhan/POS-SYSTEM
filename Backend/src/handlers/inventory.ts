import { database_connection } from '../db'


//////////////////////////////////////CREATE INVENTORY//////////////////////////////////////

export const createInventory = async (req, res) => {
    const inventoryCollection = await database_connection(['inventory']);
    const {addToWebsite,category,name,qty,unitPrice,imgUrl}=req.body;
    const userId=req.user.id;
    const inventoryData={
        userId:userId,
        addToWebsite:addToWebsite,
        category:category,
        name:name,
        qty:qty,
        unitPrice:unitPrice,
        imgUrl:imgUrl
    }
    const result=await inventoryCollection[0].insertOne(inventoryData);   
    if(result.acknowledged===true){
        return res.status(201).json({message:"Inventory created successfully"});
    }
    else{
        return res.status(500).json({error:"Internal Server Error"});
    }      


}

//////////////////////////////////////GET ALL INVENTORY//////////////////////////////////////

export const getAllInventory = async (req, res) => {
    try {
      const inventoryCollection = await database_connection(['inventory']);
      const result = await inventoryCollection[0].find({userId:req.user.id}).toArray();
      if(result.length===0){
          return res.status(404).json({ error: 'No items in Inventory' });
        }
    return res.status(200).json(result);
    }    
    
    catch (error) {
      console.error('Error occurred:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  

}