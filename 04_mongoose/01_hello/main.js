const mongoose = require('mongoose');

async function run() {
  await mongoose.connect('mongodb://localhost:27017/test');

  const schema = new mongoose.Schema({ firstName: String, lastName: String, age: Number });
  const Customer = mongoose.model('Customer', schema);

  // create option 1
  const customer1 = new Customer({ firstName: 'Bill', lastName: 'Gates', age: 60 });
  await customer1.save();

  // read
  console.log(await Customer.find());

  // create option 2
  const customer2 = await Customer.create({ firstName: 'Steve', lastName: 'Jobs', age: 50 });

  // read
  console.log(await Customer.find());

  //update
  customer2.age = 99;
  await customer2.save();

  // read
  console.log(await Customer.find());

  // delete
  await Customer.deleteMany();

  // read
  console.log(await Customer.find());
}

run().catch((error) => console.log(error));
