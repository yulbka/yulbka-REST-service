const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
const logger = require('./common/logger');
const loginRouter = require('./resources/login/login.router');
const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/board.router');
const taskRouter = require('./resources/tasks/task.router');
const verifyAuth = require('./common/verifyAuth');

const app = express();

process.on('uncaughtException', (error) => {
  console.error(`Captured error: ${error.message}`);
  process.exit(1);
});

process.on('unhandledRejection', (reason) => {
  console.error(`Unhandled rejection detected: ${reason.message}`);
  process.exit(1);
});

const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use(logger);

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use('/login', loginRouter);
app.use('/users', verifyAuth, userRouter);
app.use('/boards', verifyAuth, boardRouter);
app.use('/boards/:boardId/tasks', verifyAuth, taskRouter);

app.use((err, req, res, next) => {
  console.error(`Internal Server Error: ${err.message}`);
  res.status(500).send('Internal Server Error');
});

module.exports = app;
