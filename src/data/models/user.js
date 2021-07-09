'use strict';

const mongoose =require('mongoose');
const bcrypt =require('bcrypt');
const jwt=require('jsonwebtoken');

const users=new mongoose.Schema({
   username:{ type:String ,reuired:true},
   email:{ type:String, required:true},
   role:{type:String,required:true, default: 'customer', enum: ['customer', 'admin'] }
});

users.virtual('token').get(function () {
    let tokenObject = {
      email: this.email,
    }
    return jwt.sign(tokenObject, process.env.SECRET)
});

users.virtual('capabilities').get(function () {
    let acl = {
      customer: ['read-one',, 'create'],
      admin: ['read-all', 'update','delete'],
    };
    return acl[this.role];
});

users.pre('save',async function(){
    try{
      if(this.isModified('passwor')){
          this.password= await bcrypt.hash(this.password, 10);
      }
    }catch(e){
        throw new Error(e.message)
    }
});

//static methods goes here 

users.statics.authentcateBasic= async function(email,password){
 try{
     const user=await this.findOne({email});
     const valid=await bcrypt.compare(password,user.password);
     if (valid) { return user; }
     throw new Error('Invalid User');
 }catch(e){
     throw new Error(e.message)
 }
}

users.statics.authenticateWithToken = async function (token) {
    try {
      const parsedToken = jwt.verify(token, process.env.SECRET);
      const user = this.findOne({ email: parsedToken.email })
      if (user) { return user; }
      throw new Error("User Not Found");
    } catch (e) {
      throw new Error(e.message)
    }
  }

  module.exports = mongoose.model('users', users);