const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//  Defining the Schema Model
var movieUserSchema = new Schema({
  fname: {
    type: String,
    required: true
  },
  lname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
    minlength: 8
  },
  date: {
    type: Date,
    required: false,
    default: Date.now
  }
});

module.exports = MovieUser = new mongoose.model('MovieUser', movieUserSchema);
