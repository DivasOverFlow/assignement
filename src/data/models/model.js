'use strict';

class DataModel {

  constructor(model) {
    this.model = model;
  }

  get(_id) {
    if (_id) {
      return this.model.find({ customer:_id });
    }
    else {
      return this.model.find({});
    }
  }
  

  create(record) {
    let newRecord = new this.model(record);
    return newRecord.save();
  }

  update(_id, record) {
    return this.model.findByIdAndUpdate(_id, record, { new: true });
  }

  delete(_id) {
    return this.model.findByIdAndDelete(_id);
  }

}

module.exports = DataModel;