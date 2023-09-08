const Joi = require('joi');

const schema = Joi.object({
  id: Joi.number().required(),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  age: Joi.number().required()
});

const list = [
  {
    id: 1,
    firstName: 'Oneil',
    lastName: 'Johnson',
    age: 49
  },
  {
    id: 2,
    firstName: 'Lindsey',
    lastName: 'William',
    age: 25
  },
  {
    id: 3,
    firstName: 'Douglas',
    lastName: 'Tran',
    age: 47
  }
];

function find(id) {
  return list.find((c) => c.id === id);
}

function create(customer) {
  customer.id = list.length > 0 ? list[list.length - 1].id + 1 : 1;
  list.push(customer);
  return customer;
}

function update(customer, data) {
  return (list[list.indexOf(customer)] = { ...data });
}

function remove(customer) {
  list.splice(list.indexOf(customer), 1);
}

module.exports = { schema, list, find, create, update, remove };
