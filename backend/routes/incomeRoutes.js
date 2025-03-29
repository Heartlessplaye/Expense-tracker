const express = require('express'); 
const {protect} = require('../middleware/authMiddleware');
const {addIncome, getAllIncome, downloadIncomeExcel, deleteIncome} = require("../controllers/incomeController"); 

const router = express.Router(); 

router.post("/add", protect, addIncome);
router.get("/get", protect,  getAllIncome); 
router.get("/download-excel", protect, downloadIncomeExcel); 
router.delete("/:id", protect, deleteIncome); 

module.exports = router; 
