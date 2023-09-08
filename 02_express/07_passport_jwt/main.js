const fs = require('fs');
const Joi = require('joi');
const crypto = require('crypto');
const express = require('express');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

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

const options = { secretOrKey: publicKey, jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken() };
passport.use(
  new JwtStrategy(options, (payload, done) => {
    const user = users.find((u) => u.username === payload.sub);
    if (!user) return done(null, false);
    return done(null, user);
  })
);

app.use(passport.initialize());

app.get('/api/public', (req, res) => {
  res.json(true);
});

app.get('/api/private', passport.authenticate('jwt', { session: false }), (req, res) => {
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

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
