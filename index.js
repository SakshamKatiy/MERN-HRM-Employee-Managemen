const express = require('express');
const app = express();
const PORT = process.env.PORT | 3000

// database tables
const conn = require('./model/conn');
const categoryTable = require('./model/category');
const employeeTable = require('./model/employee');
const router = require('./Routes/AdminRoute');
const cors = require('cors');
const cookieParser = require('cookie-parser');

app.use(cors({
    origin:"http://localhost:5173",
    methods:['GET','POST','PUT','DELETE'],
    credentials:true
}))
app.use(express.json())
app.use(cookieParser())
app.use('/auth',router)
app.use(express.static('Public'))

app.listen(PORT,()=>{
    console.log(`server running on the port http://localhost:${PORT}`)
})