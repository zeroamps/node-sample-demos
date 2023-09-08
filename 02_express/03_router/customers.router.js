const express = require('express');
const customers = require('./customers.service');
const { validateSchema, loadEntity } = require('./middleware');

const router = express.Router();

router.get('/', (req, res) => {
  res.json(customers.list);
});

router.get('/:id', loadEntity(customers), (req, res) => {
  res.json(req.entity);
});

router.post('/', validateSchema(customers.schema), (req, res) => {
  res.json(customers.create(req.body));
});

router.put('/:id', loadEntity(customers), validateSchema(customers.schema), (req, res) => {
  res.json(customers.update(req.entity, req.body));
});

router.delete('/:id', loadEntity(customers), (req, res) => {
  customers.remove(req.entity);
  res.status(204).json();
});

module.exports = router;
