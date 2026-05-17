const express = require('express');
const Goal = require('../models/Goal');
const Audit = require('../models/Audit');
const auth = require('../middleware/auth');

const router = express.Router();



// =========================================
// GET GOALS
// =========================================
router.get('/', auth, async (req, res) => {

 try {

   let goals;

   // ADMIN + MANAGER CAN SEE ALL
   if (

      req.user.role === 'admin' ||

      req.user.role === 'manager'

   ) {

      goals = await Goal.find()
      .sort({ createdAt: -1 });

   }

   // EMPLOYEE SEES OWN GOALS
   else {

      goals = await Goal.find({
         employee: req.user.id
      }).sort({ createdAt: -1 });

   }

   res.json(goals);

 } catch (err) {

   console.log(err);

   res.status(500).json({
      message: 'Server Error'
   });

 }

});



// =========================================
// CREATE GOAL
// =========================================
router.post('/', auth, async (req, res) => {

 try {

   const {
      title,
      weightage
   } = req.body;

   // MAX 8 GOALS
   const goalCount =
   await Goal.countDocuments({
      employee: req.user.id
   });

   if (goalCount >= 8) {

      return res.status(400).json({
         message:
         'Maximum 8 goals allowed'
      });

   }

   // MINIMUM 10%
   if (Number(weightage) < 10) {

      return res.status(400).json({
         message:
         'Minimum weightage is 10%'
      });

   }

   // EXISTING GOALS
   const existingGoals =
   await Goal.find({
      employee: req.user.id
   });

   // TOTAL WEIGHTAGE
   const total =
   existingGoals.reduce(
      (a, g) => a + g.weightage,
      0
   ) + Number(weightage);

   // MAX 100%
   if (total > 100) {

      return res.status(400).json({
         message:
         'Total weightage cannot exceed 100%'
      });

   }

   // CREATE GOAL
   const goal = await Goal.create({

      title,

      weightage,

      employee: req.user.id,

      status: 'Pending',

      progress: 30,

      quarterlyUpdates: [

         {
            quarter: 'Q1',
            planned: '',
            actual: '',
            managerComment: '',
            status: 'Pending'
         },

         {
            quarter: 'Q2',
            planned: '',
            actual: '',
            managerComment: '',
            status: 'Pending'
         },

         {
            quarter: 'Q3',
            planned: '',
            actual: '',
            managerComment: '',
            status: 'Pending'
         },

         {
            quarter: 'Q4',
            planned: '',
            actual: '',
            managerComment: '',
            status: 'Pending'
         }

      ]

   });

   // AUDIT
   await Audit.create({

      action:
      `Goal Created: ${goal.title}`

   });

   res.json(goal);

 } catch (err) {

   console.log(err);

   res.status(500).json({
      message: 'Server Error'
   });

 }

});



// =========================================
// APPROVE GOAL
// =========================================
router.put('/:id/approve', auth, async (req, res) => {

 try {

   // ONLY MANAGER/ADMIN
   if (

      req.user.role !== 'manager' &&

      req.user.role !== 'admin'

   ) {

      return res.status(403).json({
         message: 'Access Denied'
      });

   }

   const goal =
   await Goal.findByIdAndUpdate(

      req.params.id,

      {

         status: 'Approved',

         progress: 100

      },

      { new: true }

   );

   // AUDIT
   await Audit.create({

      action:
      `Goal Approved: ${goal.title}`

   });

   res.json(goal);

 } catch (err) {

   console.log(err);

   res.status(500).json({
      message: 'Server Error'
   });

 }

});



// =========================================
// REJECT GOAL
// =========================================
router.put('/:id/reject', auth, async (req, res) => {

 try {

   // ONLY MANAGER/ADMIN
   if (

      req.user.role !== 'manager' &&

      req.user.role !== 'admin'

   ) {

      return res.status(403).json({
         message: 'Access Denied'
      });

   }

   const goal =
   await Goal.findByIdAndUpdate(

      req.params.id,

      {

         status: 'Rejected',

         progress: 0

      },

      { new: true }

   );

   // AUDIT
   await Audit.create({

      action:
      `Goal Rejected: ${goal.title}`

   });

   res.json(goal);

 } catch (err) {

   console.log(err);

   res.status(500).json({
      message: 'Server Error'
   });

 }

});



// =========================================
// UPDATE CHECK-IN
// =========================================
router.put('/:id/checkin', auth, async (req, res) => {

 try {

   const {

      quarter,
      planned,
      actual,
      managerComment,
      status

   } = req.body;

   const goal =
   await Goal.findById(
      req.params.id
   );

   if (!goal) {

      return res.status(404).json({
         message: 'Goal not found'
      });

   }

   const update =
   goal.quarterlyUpdates.find(

      q => q.quarter === quarter

   );

   if (update) {

      update.planned = planned;
      update.actual = actual;
      update.managerComment =
      managerComment;
      update.status = status;

   }

   await goal.save();

   // AUDIT
   await Audit.create({

      action:
      `${quarter} Check-In Updated for ${goal.title}`

   });

   res.json(goal);

 } catch (err) {

   console.log(err);

   res.status(500).json({
      message: 'Server Error'
   });

 }

});



// =========================================
// DELETE GOAL
// =========================================
router.delete('/:id', auth, async (req, res) => {

 try {

   const goal =
   await Goal.findByIdAndDelete(
      req.params.id
   );

   // AUDIT
   await Audit.create({

      action:
      `Goal Deleted: ${goal.title}`

   });

   res.json({
      message: 'Goal Deleted'
   });

 } catch (err) {

   console.log(err);

   res.status(500).json({
      message: 'Server Error'
   });

 }

});



// =========================================
// AUDIT LOGS
// =========================================
router.get('/audit/logs', auth, async (req, res) => {

 try {

   const logs =
   await Audit.find()

   .sort({ createdAt: -1 })

   .limit(20);

   res.json(logs);

 } catch (err) {

   console.log(err);

   res.status(500).json({
      message: 'Server Error'
   });

 }

});



module.exports = router;