/* eslint-disable linebreak-style */
// Для парсинга тела запроса
const bodyParser = require('body-parser');

module.exports = (app) => {
  app.use(bodyParser.json());
};
