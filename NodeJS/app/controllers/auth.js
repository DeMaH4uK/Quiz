/* eslint-disable linebreak-style */
const mongoose = require('mongoose');
const bCrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authHealper = require('../helpers/authHealper');
const { secret } = require('../../config/app').jwt;

const User = mongoose.model('User');
const Token = mongoose.model('Token');

const updateTokens = (userId) => {
  const accessToken = authHealper.generateAccessToken(userId);
  const refreshToken = authHealper.generateRefreshToken();

  return authHealper.replaceDbRefreshToken(refreshToken.id, userId)
    .then(() => ({
      accessToken,
      refreshToken: refreshToken.token,
    }));
};

const signIn = (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .exec()
    .then((user) => {
      if (!user) {
        res.status(401).json({ message: 'User does not exist!' });
      }

      const isValid = bCrypt.compareSync(password, user.password);
      if (isValid) {
        // eslint-disable-next-line no-underscore-dangle
        updateTokens(user._id).then((tokens) => res.json(tokens));
      } else {
        res.status(401).json({ message: 'Invalid credentials!' });
      }
    })
    .catch((err) => res.status(500).json({ message: err.message }));
};

const signUp = (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email })
    .exec()
    .then((user) => {
      if (user) {
        res.status(401).json({ message: 'User exist! Registration with this e-mail is not possible!' });
      } else {
        const salt = bCrypt.genSaltSync(10);
        const cryptedPassword = bCrypt.hashSync(password, salt);
        User.create({ email: req.body.email, password: cryptedPassword })
          .then((createdUser) => res.json(createdUser))
          .catch((err) => res.status(500).json(err));
      }
    })
    .catch((err) => res.status(500).json({ message: err.message }));
};

const refreshTokens = (req, res) => {
  const { refreshToken } = req.body;
  let payload;
  try {
    payload = jwt.verify(refreshToken, secret);
    if (payload.type !== 'refresh') {
      res.status(400).json({ message: 'Invalid Token!' });
      return;
    }
  } catch (e) {
    if (e instanceof jwt.TokenExpiredError) {
      res.status(400).json({ message: 'Token expired!' });
      return;
    // eslint-disable-next-line no-else-return
    } else if (e instanceof jwt.JsonWebTokenError) {
      res.status(400).json({ message: 'Invalid Token!' });
      return;
    }
  }

  Token.findOne({ tokenId: payload.id })
    .exec()
    .then((token) => {
      if (token === null) {
        throw new Error('Invalid Token!');
      }

      return updateTokens(token.userId);
    })
    .then((tokens) => res.json(tokens))
    .catch((err) => res.status(400).json({ message: err.message }));
};

module.exports = {
  signIn,
  signUp,
  refreshTokens,
};
