"use strict";

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

//Schema for bar data

const barSchema = mongoose.Schema({
  name: {type: String, required: true},
  address: {type: String, required: true},
  hours: {type: String, required: true},
  description: {type: String}
})

barSchema.set('toObject', {
  transform: function (doc,ret) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  }
});

barSchema.methods.serialize = function() {
  return {
    id: this._id,
    name: this.name,
    address: this.address,
    hours: this.hours,
    description: this.description
  }
}

// const Bar = mongoose.model("Bar", barSchema);

// module.exports = {Bar}

module.exports = mongoose.model('Bar', barSchema)
