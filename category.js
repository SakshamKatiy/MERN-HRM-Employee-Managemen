const mongoose = require('mongoose');


const categorySchema = new mongoose.Schema({
    category:{
        type:String,
        required:true
    }
})

const categoryTable = mongoose.model('categoryTable',categorySchema)

module.exports = categoryTable;