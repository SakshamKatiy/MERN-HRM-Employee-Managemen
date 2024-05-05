const mongoose = require('mongoose');

const db = mongoose.connect('mongodb://localhost:27017/Employee',{

}).then(()=>{
    console.log('connected successfully')
}).catch((err)=>{
console.log(err)
})

const hrmSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})


const conn = mongoose.model('hrmTable',hrmSchema)

module.exports = conn;
