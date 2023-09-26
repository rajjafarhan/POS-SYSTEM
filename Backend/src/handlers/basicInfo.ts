import { database_connection } from "../db";
import { ObjectId } from "mongodb";

export const setBasicInfo = async (req, res) => {
  try {
    const id = new ObjectId(req?.user?.id);
    const infoCol = await database_connection(["shops"]);
    const row = await infoCol[0].updateOne(
      { _id: id },
      {
        $set: {
          shopName: req.body.shopName,
          ownerName: req.body.ownerName,
          shopAdd: req.body.shopAdd,
          contactNo: req.body.contactNo,
        },
      },
    );
    console.log(row);
    res
      .json({
        message: "ok",
        row,
      })
      .status(200)
      .end();
  } catch (e) {
    console.log(e);
    res
      .json({
        message: "opps error",
        e,
      })
      .status(500)
      .end();
  }
};

export const setEmail = async (req, res) => {
  try {
    const id = new ObjectId(req?.user?.id);
    const infoCol = await database_connection(["shops"]);
    const row = await infoCol[0].updateOne(
      { _id: id },
      {
        $set: {
          username: req.body.username,
        },
      },
    );
    res
      .json({
        message: "ok",
        row,
      })
      .status(200)
      .end();
  } catch (e) {
    console.log(e);
    res
      .json({
        message: "opps error",
        e,
      })
      .status(500)
      .end();
  }
};

export const getBasicInfo = async (req, res) => {
  try {
    const id = new ObjectId(req?.user?.id);
    const infoCol = await database_connection(["shops"]);
    const row = await infoCol[0].findOne(
      { _id: id },
      { project: { username: 0, password: 0 } },
    );
    res
      .json({
        message: "ok",
        row,
      })
      .status(200)
      .end();
  } catch (e) {
    console.log(e);
    res
      .json({
        message: "ops error",
        e,
      })
      .status(200)
      .end();
  }
};

export const deleteAccount = async (req, res) => {
  try {
    const id = new ObjectId(req?.user?.id);
    const infoCol = await database_connection([
      "shops",
      "inventory",
      "vendor invoice",
      "customer invoice",
    ]);
    const results = await Promise.all([
      infoCol[1].deleteMany({ userId: req.user.id }),
      infoCol[0].deleteMany({ _id: id }),
      infoCol[2].deleteMany({ userId: req.user.id }),
      infoCol[3].deleteMany({ userId: req.user.id }),
    ]);
    res
      .json({
        message: "ok",
        results,
      })
      .status(200)
      .end();
  } catch (e) {
    console.log(e);
    res
      .json({
        message: "ops error",
        e,
      })
      .status(200)
      .end();
  }
};

///bla bla bla
