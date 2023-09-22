import { database_connection } from "../db";
import { ObjectId } from "mongodb";

//////////////////////////////////////////////////////////////////////get all vendors

export const getAllVendors = async (req, res) => {
  try {
    const vendorcollection = await database_connection(["vendor invoice"]);
    const setNo = parseInt(req.params.setNo);
    const itemsPerPage = 50;

    if (setNo < 1) {
      return res.status(400).json({ error: "Invalid set number" });
    }

    // Calculate the skip value based on the set number and items per page
    const skip = (setNo - 1) * itemsPerPage;

    // Use an aggregation pipeline to fetch vendors for the specified set
    const vendors = await vendorcollection[0]
      .aggregate([
        { $match: { userId: req.user.id } }, // Match vendors belonging to the user
        { $sort: { date: -1 } }, // Sort by date in descending order (most recent first)
        { $skip: skip }, // Skip vendors for previous sets
        { $limit: itemsPerPage }, // Limit to the current set of vendors
      ])
      .toArray();
    const totalVendorCount = await vendorcollection[0].countDocuments({
      userId: req.user.id,
    });

    if (vendors.length === 0) {
      return res.status(404).json({ message: "No vendors found for this set" });
    }

    return res
      .status(200)
      .json({ vendors: vendors, totalCount: totalVendorCount });
  } catch (error) {
    console.error("Error fetching vendor invoices:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

/////////////////////////////////////////////////CREATE VENDOR////////////////////////////

export const createVendor = async (req, res) => {
  try {
    const vendorcollection = await database_connection(["vendor invoice"]);
    const { cash, change, date, product, rDesc, rName, total } = req.body;

    // Get the user's ID from the request (assuming it's available in req.user._id)
    const userId = req.user.id;
    // console.log(userId);

    const vendorData = {
      userId: userId, // Associate the vendor with the user by including their ID
      cash: cash,
      change: change,
      date: new Date(date),
      product: product,
      rDesc: rDesc,
      rName: rName,
      total: total,
    };

    const result = await vendorcollection[0].insertOne(vendorData);

    if (result.acknowledged === true) {
      console.log("Vendor data inserted successfully:", result.insertedId);
      return res
        .status(201)
        .json({ message: "Vendor data inserted successfully" });
    } else {
      console.log("Error occurred while inserting the data");
      return res.status(500).json({ error: "Internal Server Error" });
    }
  } catch (error) {
    console.error("Error occurred:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

///////////////////////////////////////////DELETE VENDOR/////////////////////////////////////

export const deleteVendor = async (req, res) => {
  try {
    const vendorCollection = await database_connection(["vendor invoice"]);

    //   const vendorIdToDelete = req.params.id;
    const vendorIdToDelete = new ObjectId(`${req.params.id}`);

    // Find the vendor by ID and also check if it belongs to the user (using userId)
    const deletedVendor = await vendorCollection[0].findOneAndDelete({
      _id: vendorIdToDelete,
      userId: req.user.id,
    });

    if (!deletedVendor) {
      // If the vendor was not found or didn't belong to the user, return a 404 status
      return res.status(404).json({ message: "Vendor not found" });
    }
    console.log(deletedVendor);

    // If the vendor was successfully deleted, return a success message
    return res.status(200).json({ message: "Vendor deleted successfully" });
  } catch (error) {
    console.error("Error deleting vendor:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

////////////DELETE ALL VENDORS/////////////////////////////
export const deleteAllVendors = async (req, res) => {
  try {
    const vendorcollection = await database_connection(["vendor invoice"]);

    // Delete all vendors associated with the user
    const deleteResult = await vendorcollection[0].deleteMany({
      userId: req.user.id,
    });

    if (deleteResult.deletedCount > 0) {
      return res
        .status(200)
        .json({ message: "All vendors deleted successfully" });
    } else {
      return res.status(404).json({ message: "No vendors found for deletion" });
    }
  } catch (error) {
    console.error("Error deleting vendors:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
