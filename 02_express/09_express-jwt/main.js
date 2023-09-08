const fs = require('fs');
const Joi = require('joi');
const crypto = require('crypto');
const express = require('express');
const jwt = require('jsonwebtoken');
const { expressjwt } = require('express-jwt');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const salt = crypto.randomBytes(16).toString('hex');
function hashPassword(password, salt) {
  return crypto.pbkdf2Sync(password, salt, 1000, 64, `sha512`).toString(`hex`);
}
const hash = hashPassword('1234', salt);

const users = [
  { id: 1, username: 'bill', hash, salt },
  { id: 2, username: 'mark', hash, salt },
  { id: 3, username: 'john', hash, salt }
];

function verifyPassword(password, hash, salt) {
  return hash === hashPassword(password, salt);
}

const publicKey = fs.readFileSync('./public.pem');
const privateKey = fs.readFileSync('./private.pem');

app.get('/api/public', (req, res) => {
  res.json(true);
});

app.get('/api/private', expressjwt({ secret: publicKey, algorithms: ['RS256'] }), (req, res) => {
  res.json(true);
});

const validateSchema = async (req, res, next) => {
  const schema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required()
  });

  try {
    await schema.validateAsync(req.body);
    next();
  } catch (error) {
    const { details } = error;
    const message = details.map((i) => i.message).join(',');
    res.status(400).json({ error: message });
  }
};

app.post('/api/login', validateSchema, (req, res) => {
  const user = users.find((u) => u.username === req.body.username);
  if (!user) return res.sendStatus(401);
  if (!verifyPassword(req.body.password, user.hash, user.salt)) return res.sendStatus(401);
  res.send({ token: jwt.sign({ sub: req.body.username }, privateKey, { algorithm: 'RS256', expiresIn: 60 }) });
});

app.use(function (err, req, res, _next) {
  if (err.name === 'UnauthorizedError') res.sendStatus(401);
  res.sendStatus(500);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
