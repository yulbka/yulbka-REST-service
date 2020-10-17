const morgan = require('morgan');

morgan.token('params', (req) => JSON.stringify(req.params));
morgan.token('body', (req) => {
  let body = req.body;
  if (body.password) {
    body = {
      ...body,
      password: '*'.repeat(body.password.length),
    }
  }
  return JSON.stringify(body)
});

const logger = morgan(function(tokens, req, res) {
  return [
    `method: ${tokens.method(req)},`,
    `url: ${tokens.url(req)},`,
    `request params: ${tokens.params(req)},`,
    `request body: ${tokens.body(req)}`
  ].join(' ')
});

module.exports = logger;