 require('dotenv').config(); 
const express = require('express'); 
const cors = require('cors'); 
const path = require('path'); 
const connectDB = require('./config/db')
const app = express(); 
const authRoutes = require('./routes/authRoutes')
const incomeRoutes = require('./routes/incomeRoutes');
const expenseRoutes = require('./routes/expenseRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
// Middleware cors & bodyparser 

app.use(cors(  {
    origin : "*", 
    methods : ["GET", "PUT" , "DELETE" , "POST"], 
    allowedHeaders : ["Authorization", "Content-Type"]
})); 

app.use(express.json());

// db connected
connectDB();

// handling requests 

app.use("/api/v1/auth", authRoutes); 
app.use("/api/v1/income", incomeRoutes); 
app.use("/api/v1/expense", expenseRoutes); 
app.use("/api/v1/dashboard" , dashboardRoutes); 
app.use("/uploads", express.static(path.join(__dirname, "uploads"))); 




const PORT = process.env.PORT || 5000; 
app.listen(PORT , () => { 
    console.log(`Server is listening at ${PORT}`)
})