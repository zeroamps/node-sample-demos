const crypto = require('crypto');
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(session({ secret: 'SECRET_KEY', resave: false, saveUninitialized: false, cookie: { maxAge: 60 * 1000 } }));

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

passport.use(
  new LocalStrategy((username, password, done) => {
    const user = users.find((u) => u.username === username);
    if (!user) return done(null, false);
    if (!verifyPassword(password, user.hash, user.salt)) return done(null, false);
    return done(null, user);
  })
);

passport.serializeUser((user, done) => {
  done(null, user); // serialize to req.session.passport.user
});

passport.deserializeUser((user, done) => {
  return done(null, user); // serialize from req.session.passport.user
});

app.use(passport.initialize());
app.use(passport.session());

function authorized(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.send(401);
}

app.get('/api/public', (req, res) => {
  res.json(true);
});

app.get('/api/private', authorized, (req, res) => {
  res.json(true);
});

app.post('/api/login', passport.authenticate('local'), (req, res) => {
  console.log(req.session);
  res.sendStatus(200);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
