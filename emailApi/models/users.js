const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
});

module.exports = mongoose.model('user', schema);
