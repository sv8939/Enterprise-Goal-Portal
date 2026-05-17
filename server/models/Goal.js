const mongoose = require('mongoose');

const GoalSchema = new mongoose.Schema({

 title:{

   type:String,

   required:true

 },

 // GOAL WEIGHTAGE
 weightage:{

   type:Number,

   required:true

 },

 // EMPLOYEE WHO CREATED GOAL
 employee:{

   type:mongoose.Schema.Types.ObjectId,

   ref:'User'

 },

 // GOAL STATUS
 status:{

   type:String,

   default:'Pending'

 },

 // GOAL PROGRESS
 progress:{

   type:Number,

   default:30

 },

 // QUARTERLY CHECK-INS
 quarterlyUpdates:[

   {

     quarter:String,

     planned:String,

     actual:String,

     managerComment:String,

     status:String

   }

 ],

 createdAt:{

   type:Date,

   default:Date.now

 }

});

module.exports =
mongoose.model('Goal', GoalSchema);