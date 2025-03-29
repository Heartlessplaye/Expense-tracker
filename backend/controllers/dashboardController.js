const { Types } = require("mongoose");
const Expense = require("../models/Expense");
const Income = require("../models/Income");
const {ObjectId} = require("mongodb")
exports.getDashboardDetails = async (req, res) => {
  try {
    const userId = req.user.id;
    const userObjectId = new Types.ObjectId(String(userId));
    // fetch total income & expense
    const totalIncome = await Income.aggregate([
      {
        $match: {
          userId: userObjectId
        },
      },
      {
        $group: {
          _id: null,
          total: {
            $sum: "$amount",
          },
        },
      },
    ]);
    // console.log("Total income : ", totalIncome);
    const totalExpense = await Expense.aggregate([
      {
        $match: {
          userId: userObjectId,
        },
      },
      {
        $group: {
          _id: null,
          total: {
            $sum: "$amount",
          },
        },
      },
    ]);

    // console.log("Total Expense : ", totalExpense);
    // fetch income transactions in last 60 days
    const last60DaysIncomeTransactions = await Income.find({
      userId,
      date: {
        $gte: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000),
      },
    }).sort({ date: -1 });

    // sum of total income in 60 days
    const totalIncomeLast60Days = last60DaysIncomeTransactions.reduce(
      (sum, transaction) => {
        sum + transaction.amount;
      },
      0
    );

    // fetch expense transactions in last 30 days
    const last30DaysExpenseTransactions = await Expense.find({
      userId,
      date: {
        $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      },
    }).sort({ date: -1 });

    // sum of total expense in 30 days
    const totalExpenseLast30Days = last30DaysExpenseTransactions.reduce(
      (sum, transaction) => {
        sum + transaction.amount;
      },
      0
    );

    //fetch last 5 txn expense + income

    const recentTransactions = [
      ...(await Income.find({ userId }).sort({ date: -1 }).limit(5)).map(
        (txn) => ({
          ...txn.toObject(),
          type: "income",
        })
      ),
      ...(await Expense.find({ userId }).sort({ date: -1 }).limit(5)).map(
        (txn) => ({
          ...txn.toObject(),
          type: "expense",
        })
      ),
    ].sort((a, b) => b.date - a.date); // acc to recent event

    res.status(200).json({
      totalBalance:
        (totalIncome[0]?.total || 0) - (totalExpense[0]?.total || 0),
      totalIncome: totalIncome[0]?.total || 0,
      totalExpense: totalExpense[0]?.total || 0,
      last60DaysIncome: {
        total: totalIncomeLast60Days,
        transactions: last60DaysIncomeTransactions,
      },
      last30DaysExpense: {
        total: totalExpenseLast30Days,
        transactions: last30DaysExpenseTransactions,
      },
      recentTransactions,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error finding dashboard details ",
      error: err.message,
    });
  }
};
