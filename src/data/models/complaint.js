'use strict';

const mongoose = require('mongoose');

const complaintSchema = mongoose.Schema({
  status:{type:String, default:'pending',enum:['resolved','pending','dissmiss']},
  text: { type: String, required: true },
  customer:{type:mongoose.Schema.Types.ObjectId,ref:'users'},
  comtype :{type:String, required:true},
  //   calories: { type: Number, required: true },
  //   type: { type: String, uppercase: true, enum: ['FRUIT', 'VEGETABLE', 'PROTIEN'] },
});

 

module.exports = mongoose.model('complaint',complaintSchema);