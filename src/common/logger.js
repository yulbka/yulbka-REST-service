const morgan = require('morgan');

morgan.token('query', (req) => JSON.stringify(req.query));
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
    `request query params: ${tokens.query(req)},`,
    `request body: ${tokens.body(req)}`
  ].join(' ')
});

module.exports = logger;