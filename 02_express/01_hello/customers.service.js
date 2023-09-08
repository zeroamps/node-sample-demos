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

function validate(customer) {
  if (isNaN(customer.id)) return 'id is required and should be a number value';
  if (!customer.firstName || typeof customer.firstName != 'string')
    return 'firstName is required and should be a string value';
  if (!customer.lastName || typeof customer.lastName != 'string')
    return 'lastName is required and should be a string value';
  if (isNaN(customer.age)) return 'age is required and should be a number value';
  return undefined;
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

module.exports = { list, find, validate, create, update, remove };
