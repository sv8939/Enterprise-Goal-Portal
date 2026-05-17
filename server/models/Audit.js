
const mongoose=require('mongoose');

module.exports=mongoose.model('Audit',new mongoose.Schema({
action:String
},{timestamps:true}));
