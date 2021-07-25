/* eslint-disable linebreak-style */
// mongoose для работы с MongoDB
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
});
mongoose.model('User', userSchema);
