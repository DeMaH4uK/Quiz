/* eslint-disable linebreak-style */
const questions = require('../app/controllers/questions');
const auth = require('../app/controllers/auth');
const authMiddleware = require('../app/middleware/auth');

module.exports = (app) => {
  // questions
  // eslint-disable-next-line spaced-comment
  app.get('/questions', authMiddleware, questions.getAll);
  app.post('/questions', authMiddleware, questions.create);
  app.put('/questions/:id', authMiddleware, questions.update);
  app.delete('/questions/:id', authMiddleware, questions.remove);

  // test
  app.post('/test', /* authMiddleware, */questions.upload);

  // auth
  app.post('/signin', auth.signIn);
  app.post('/signup', auth.signUp);
  app.post('/refresh-tokens', auth.refreshTokens);
};
