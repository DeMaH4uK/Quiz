/* eslint-disable linebreak-style */
// mongoose для работы с MongoDB
const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  id: Number,
  question: String,
  responses: Array,
});
mongoose.model('Question', questionSchema);
