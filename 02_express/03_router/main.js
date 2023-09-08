const express = require('express');
const customers = require('./customers.router');

const app = express();
app.use(express.json());

app.use('/api/customers', customers);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
