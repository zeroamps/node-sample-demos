const express = require('express');
const winston = require('winston');

const app = express();
const logger1 = winston.createLogger({
  format: winston.format.combine(
    winston.format.label({ label: 'Meow!' }),
    winston.format.timestamp(),
    winston.format.prettyPrint()
  ),
  transports: [new winston.transports.Console()]
});

const logger2 = winston.createLogger({
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(winston.format.colorize(), winston.format.simple())
    })
  ]
});

const logger3 = winston.createLogger({
  format: winston.format.combine(winston.format.timestamp(), winston.format.prettyPrint()),
  transports: [new winston.transports.File({ filename: 'service.log', maxsize: 256 })]
});

app.get('/', (_req, _res) => {
  logger1.info('An info logging message!');
  logger1.warn('A warn logging message!');
  logger1.error('An error logging message!');

  logger2.info('An info logging message!');
  logger2.warn('A warn logging message!');
  logger2.error('An error logging message!');

  logger3.info('An info logging message!');
  logger3.warn('A warn logging message!');
  logger3.error('An error logging message!');

  throw new Error('Hmmm, this is an error!');
  // res.json(true);
});

app.use(
  function (err, req, res, next) {
    logger2.error(err.message);
    logger3.error(err.message);
    next(err);
  },
  function (err, req, res, _next) {
    if (err.name === 'UnauthorizedError') res.sendStatus(401);
    res.sendStatus(500);
  }
);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
