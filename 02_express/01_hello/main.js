const express = require('express');
const customers = require('./customers.service');

const ERR_NOT_EXIST = "doesn't exist";

const app = express();
app.use(express.json());

app.get('/api/customers', (req, res) => {
  res.json(customers.list);
});

app.get('/api/customers/:id', (req, res) => {
  const customer = customers.find(parseInt(req.params.id));
  if (!customer) return res.status(404).json({ error: ERR_NOT_EXIST });
  res.json(customer);
});

app.post('/api/customers', (req, res) => {
  const error = customers.validate(req.body);
  if (error) return res.status(400).json({ error });
  res.json(customers.create(req.body));
});

app.put('/api/customers/:id', (req, res) => {
  const customer = customers.find(parseInt(req.params.id));
  if (!customer) return res.status(404).json({ error: ERR_NOT_EXIST });

  const error = customers.validate(req.body);
  if (error) return res.status(400).json({ error });

  res.json(customers.update(customer, req.body));
});

app.delete('/api/customers/:id', (req, res) => {
  const customer = customers.find(parseInt(req.params.id));
  if (!customer) return res.status(404).json({ error: ERR_NOT_EXIST });

  customers.remove(customer);
  res.status(204).json();
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
