const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
const logger = require('./common/logger');
const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/board.router');
const taskRouter = require('./resources/tasks/task.router');

const app = express();

process.on('uncaughtException', (error) => {
  console.error(`Captured error: ${error.message}`);
  process.exit(1);
});

process.on('unhandledRejection', (reason) => {
  console.error(`Unhandled rejection detected: ${reason.message}`);
});

const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use(logger);

app.use((err, req, res, next) => {
  res.status(500).send('Internal Server Error');
});

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use('/users', userRouter);
app.use('/boards', boardRouter);
app.use('/boards/:boardId/tasks', taskRouter);

module.exports = app;
