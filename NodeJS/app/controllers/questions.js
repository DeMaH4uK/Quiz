/* eslint-disable linebreak-style */
const mongoose = require('mongoose');

const Question = mongoose.model('Question');

const getAll = (req, res) => {
  Question.find()
    .exec()
    .then((questions) => res.json(questions))
    .catch((err) => res.status(500).json(err));
};

const create = (req, res) => {
  Question.create(req.body)
    .then((createdQuestion) => res.json(createdQuestion))
    .catch((err) => res.status(500).json(err));
};

const update = (req, res) => {
  Question.findOneAndUpdate({ id: req.params.id }, req.body)
    .exec()
    .then((question) => res.json(question))
    .catch((err) => res.status(500).json(err));
};

const remove = (req, res) => {
  Question.deleteOne({ id: req.params.id })
    .exec()
    .then(() => res.json({ success: true }))
    .catch((err) => res.status(500).json(err));
};

const upload = () => {
  // console.log(req);
  // console.log(res);
};

module.exports = {
  getAll,
  create,
  update,
  remove,
  upload,
};
