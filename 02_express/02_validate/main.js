const express = require('express');
const customers = require('./customers.service');
const { validateSchema, loadCustomer } = require('./middleware');

const app = express();
app.use(express.json());

app.get('/api/customers', (req, res) => {
  res.json(customers.list);
});

app.get('/api/customers/:id', loadCustomer(), (req, res) => {
  res.json(req.customer);
});

app.post('/api/customers', validateSchema(customers.schema), (req, res) => {
  res.json(customers.create(req.body));
});

app.put('/api/customers/:id', loadCustomer(), validateSchema(customers.schema), (req, res) => {
  res.json(customers.update(req.customer, req.body));
});

app.delete('/api/customers/:id', loadCustomer(), (req, res) => {
  customers.remove(req.customer);
  res.status(204).json();
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
