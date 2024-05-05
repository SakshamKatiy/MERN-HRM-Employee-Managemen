const mongoose = require('mongoose');
const categoryTable = require('./category.js')
const employeeSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    salary:{
        type:Number,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'categoryTable',
        required: true
    },
    image:{
        type:String,
        required:true
    }
}) 

const employeeTable = mongoose.model('employeeTable',employeeSchema)
module.exports = employeeTable;