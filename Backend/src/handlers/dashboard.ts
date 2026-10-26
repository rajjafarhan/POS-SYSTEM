import { ObjectId } from "mongodb";
import { database_connection } from "../db";

export const getProfit = async (req, res) => {
  try {
    const month = Number(req.params.month);
    const year = Number(req.params.year);
    const lowerDate = new Date(`${year}-${month}-${1}`);

    let upperDate: Date = new Date();
    if (month === 12) {
      upperDate = new Date(`${year + 1}-${1}-${1}`);
    } else {
      upperDate = new Date(`${year}-${month + 1}-${1}`);
    }
    const customerCol = await database_connection([
      "vendor invoice",
      "customer invoice",
      "customer returns",
    ]);

    const costPromise = customerCol[0]
      .aggregate([
        {
          $match: {
            userId: req.user.id,
            date: { $gt: lowerDate, $lt: upperDate },
          },
        },
        { $group: { _id: null, sum: { $sum: "$total" } } },
      ])
      .toArray();
    const salePromise = customerCol[1]
      .aggregate([
        {
          $match: {
            userId: req.user.id,
            date: { $gt: lowerDate, $lt: upperDate },
          },
        },
        { $group: { _id: null, sum: { $sum: "$total" } } },
      ])
      .toArray();

    const returnPromise = customerCol[2]
      .aggregate([
        {
          $match: {
            userId: req.user.id,
            date: { $gt: lowerDate, $lt: upperDate },
          },
        },
        { $group: { _id: null, sum: { $sum: "$total" } } },
      ])
      .toArray();

    const [sales, cost, returns] = await Promise.all([salePromise, costPromise, returnPromise]);
    // sales are shown net of customer returns made in the same month
    const returned = returns[0]?.sum ?? 0;
    if (returned) {
      if (sales.length > 0) sales[0].sum -= returned;
      else sales.push({ _id: null, sum: -returned });
    }
    let profit = 0;
    if (sales.length > 0) {
      profit += sales[0].sum;
    }
    if (cost.length > 0) {
      profit -= cost[0].sum;
    }

    res
      .json({
        profit,
        sales,
        cost,
      })
      .status(200)
      .end();
  } catch (e) {
    console.log("ops error", e);
    res.json({ message: "error" }).status(404).end();
    return;
  }
};

export const getYears = async (req, res) => {
  try {
    const col = await database_connection(["shops"]);
    const result = await col[0].findOne({ _id: new ObjectId(req.user.id) });
    const { createdAt } = result;
    const years = new Date(createdAt).getFullYear();
    const arr = [];
    for (let i = years; i <= new Date().getFullYear(); i++) {
      arr.push(i);
    }
    res
      .json({
        arr,
        month: new Date(createdAt).getMonth() + 1,
      })
      .status(200)
      .end();
  } catch (e) {
    console.log(e);
  }
};

export const getStates = async (req, res) => {
  try {
    const year = req.params.year;
    const lowerDate = new Date(`${year}-1-1`);
    const upperDate = new Date(`${Number(year) + 1}-1-1`);
    const collections = await database_connection([
      "customer invoice",
      "vendor invoice",
      "customer returns",
    ]);
    const [sales, expense, returns] = await Promise.all([
      collections[0]
        .aggregate([
          {
            $match: {
              userId: req?.user?.id,
              date: { $gt: lowerDate, $lt: upperDate },
            },
          },
          {
            $project: {
              month: { $month: "$date" },
              year: { $year: "$date" },
              total: 1,
            },
          },
          {
            $group: {
              _id: { month: "$month", year: "$year" },
              totalSum: { $sum: "$total" },
            },
          },
          {
            $sort: {
              "_id.month": 1,
            },
          },
        ])
        .toArray(),
      collections[1]
        .aggregate([
          {
            $match: {
              userId: req?.user?.id,
              date: { $gt: lowerDate, $lt: upperDate },
            },
          },
          {
            $project: {
              month: { $month: "$date" },
              year: { $year: "$date" },
              total: 1,
            },
          },
          {
            $group: {
              _id: { month: "$month", year: "$year" },
              totalSum: { $sum: "$total" },
            },
          },
          {
            $sort: {
              "_id.month": 1,
            },
          },
        ])
        .toArray(),
      collections[2]
        .aggregate([
          {
            $match: {
              userId: req?.user?.id,
              date: { $gt: lowerDate, $lt: upperDate },
            },
          },
          { $group: { _id: { month: { $month: "$date" } }, totalSum: { $sum: "$total" } } },
        ])
        .toArray(),
    ]);
    // monthly sales are shown net of customer returns
    returns.forEach((r) => {
      const row = sales.find((s) => s._id.month === r._id.month);
      if (row) row.totalSum -= r.totalSum;
      else sales.push({ _id: { month: r._id.month, year: Number(year) }, totalSum: -r.totalSum });
    });
    res
      .json({
        sales,
        expense,
      })
      .status(200)
      .end();
  } catch (e) {
    console.log(e);
  }
};
