
const express=require('express');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const User=require('../models/User');

const router=express.Router();

router.post('/register',async(req,res)=>{
const hashed=await bcrypt.hash(req.body.password,10);

const user=await User.create({
name:req.body.name,
email:req.body.email,
password:hashed,
role:req.body.role
});

res.json(user);
});

router.post('/login',async(req,res)=>{
const user=await User.findOne({email:req.body.email});

if(!user){
return res.status(400).json({message:'User not found'});
}

const ok=await bcrypt.compare(req.body.password,user.password);

if(!ok){
return res.status(400).json({message:'Wrong password'});
}

const token=jwt.sign(
{id:user._id,role:user.role},
process.env.JWT_SECRET
);

res.json({token,user});
});

module.exports=router;
