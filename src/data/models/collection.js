'use strict';

const complaint=require('./complaint');
const Model=require('./model');

class complaintModel extends Model{
  constructor(){
    super(complaint);
  }
}

module.exports= new complaintModel()