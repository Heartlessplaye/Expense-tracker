const express = require("express"); 
const {getDashboardDetails} = require('../controllers/dashboardController'); 
const {protect} = require("../middleware/authMiddleware"); 
const router = express.Router(); 

router.get("/", protect, getDashboardDetails); 
module.exports = router; 