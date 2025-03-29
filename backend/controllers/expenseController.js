const Expense = require("../models/Expense");
// const User = require("../models/User");
const xlsx = require('xlsx'); 
// add Expense
exports.addExpense = async (req, res) => {
  const userId = req.user.id;
  const { icon, category, amount, date } = req.body;
  // missing fields
  console.log(req.body);
  if (!icon || !category || !amount) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    const newExpense = new Expense({
      userId,
      icon,
      category,
      amount,
      date: new Date(date),
    });
    await newExpense.save();
    res.status(201).json(newExpense);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error while Adding expense", error: err.message });
  }
};


// get all income
exports.getAllExpense = async (req, res) => { 
    const userId = req.user.id;
    try {
        const expense = await Expense.find({userId}).select("-userId").sort({date : -1}); 
        res.status(200).json({
            id : userId, 
            expense 
        })
    }
    catch(err) {
        res
        .status(500)
        .json({ message: "Error while searching expense", error: err.message });
     
    }
};


// delete income 
exports.deleteExpense = async (req, res) => { 
    const {id} = req.params; 
    try {
        const expense = await Expense.findByIdAndDelete(id); 
        res.status(200).json({message : "Expense successfully deleted", expense});
    }
    catch (err ) {
        res
        .status(500)
        .json({ message: "Error while deleting expense", error: err.message });
    }
};


// download report 
exports.downloadExpenseExcel = async (req, res) => { 
    const userId = req.user.id;
    try {
        const expense = await Expense.find({userId}).select("-userId").sort({date : -1});  
        // Excel data prep 
        const data = expense.map((item) => ({
            Category : item.category, 
            Amount : item.amount, 
            Date : item.date
        }));

        const wb = xlsx.utils.book_new(); 
        const ws = xlsx.utils.json_to_sheet(data); 
        xlsx.utils.book_append_sheet(wb,ws, "Expense");
        xlsx.writeFile(wb, 'expense_details.xlsx'); 
        res.download('expense_details.xlsx'); 

        // res.status(200).json({
        //     id : userId, 
        //     income 
        // })
    }
    catch(err) {
        res
        .status(500)
        .json({ message: "Error while downloading expense sheet", error: err.message });
     
    }
};
