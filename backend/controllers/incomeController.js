const Income = require("../models/Income");
// const User = require("../models/User");
const xlsx = require('xlsx'); 
// add Income
exports.addIncome = async (req, res) => {
  const userId = req.user.id;
  const { icon, source, amount, date } = req.body;
  // missing fields
  console.log(req.body);
  if (!icon || !source || !amount) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    const newIncome = new Income({
      userId,
      icon,
      source,
      amount,
      date: new Date(date),
    });
    await newIncome.save();
    res.status(201).json(newIncome);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error while Adding income", error: err.message });
  }
};


// get all income
exports.getAllIncome = async (req, res) => { 
    const userId = req.user.id;
    try {
        const income = await Income.find({userId}).select("-userId").sort({date : -1}); 
        res.status(200).json({
            id : userId, 
            income 
        })
    }
    catch(err) {
        res
        .status(500)
        .json({ message: "Error while searching income", error: err.message });
     
    }
};


// delete income 
exports.deleteIncome = async (req, res) => { 
    const {id} = req.params; 
    try {
        const income = await Income.findByIdAndDelete(id); 
        res.status(200).json({message : "Income successfully deleted", income});

    }
    catch (err ) {
        res
        .status(500)
        .json({ message: "Error while deleting income", error: err.message });
    }
};


// download report 
exports.downloadIncomeExcel = async (req, res) => { 
    const userId = req.user.id;
    try {
        const income = await Income.find({userId}).select("-userId").sort({date : -1});  
        // Excel data prep 
        const data = income.map((item) => ({
            Source : item.source, 
            Amount : item.amount, 
            Date : item.date
        }));

        const wb = xlsx.utils.book_new(); 
        const ws = xlsx.utils.json_to_sheet(data); 
        xlsx.utils.book_append_sheet(wb,ws, "Income");
        xlsx.writeFile(wb, 'income_details.xlsx'); 
        res.download('income_details.xlsx'); 

        // res.status(200).json({
        //     id : userId, 
        //     income 
        // })
    }
    catch(err) {
        res
        .status(500)
        .json({ message: "Error while downloading income sheet", error: err.message });
     
    }
};
