/* eslint-disable linebreak-style */
module.exports = {
  appPort: 3000,
  mongoUri: 'mongodb://localhost:27017/quiz-questions',
  jwt: {
    secret: 'MyQuizApp',
    tokens: {
      access: {
        type: 'access',
        expiresIn: '1m',
      },
      refresh: {
        type: 'refresh',
        expiresIn: '3m',
      },
    },
  },
};
