const express = require('express');
const session = require('express-session');

const app = express();

app.use(session({ secret: 'SECRET_KEY', resave: false, saveUninitialized: false, cookie: { maxAge: 60 * 1000 } }));

app.get('/', (req, res) => {
  req.session.data = { message: 'Hello, session!' };
  console.log(req.session, req.sessionID);
  res.json(true);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
