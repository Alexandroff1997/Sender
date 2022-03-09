const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  description: { type: String, required: true },
  header: { type: String, required: true },
  isActive: { type: Boolean, required: true },
});

module.exports = mongoose.model('Task', schema);
