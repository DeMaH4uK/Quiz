const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('./app/models');
const config = require('./config');

const app = express();
app.use(cors());
config.express(app);
config.routes(app);

const { appPort, mongoUri } = config.app;

mongoose.connect(mongoUri)
  .then(() => app.listen(
    appPort,
    () => console.log(`Listening on port ${appPort}...`),
  ))
  .catch((err) => console.error(`Error connect to mongoDB: ${mongoUri}`, err));
