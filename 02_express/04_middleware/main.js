const express = require('express');

const app = express();

app.use((req, res, next) => {
  console.log('Middleware #1');
  next();
});

app.use((req, res, next) => {
  console.log('Middleware #2');
  next();
});

app.use((req, res, next) => {
  console.log('Middleware #3');
  next();
});

app.get(
  '/',
  (req, res, next) => {
    console.log('Handler #1');
    next();
  },
  (req, res, next) => {
    console.log('Handler #2');
    next();
  },
  (req, res) => {
    console.log('Handler #3');
    // throw new Error('Nooooo!'); // try to uncomment :-)
    res.json(true);
  }
);

app.use((req, res) => {
  res.status(404);
  res.json({ error: 'not found' });
});

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  res.status(500);
  res.json({ error: err.message });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
