/* eslint-disable linebreak-style */
// mongoose для работы с MongoDB
const mongoose = require('mongoose');

const tokenSchema = new mongoose.Schema({
  tokenId: String,
  userId: String,
});
mongoose.model('Token', tokenSchema);
