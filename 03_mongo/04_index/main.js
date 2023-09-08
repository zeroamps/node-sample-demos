const { MongoClient } = require('mongodb');

async function run() {
  const client = new MongoClient('mongodb://localhost:27017');

  try {
    await client.connect();
    const database = client.db('test');

    const collections = await database.listCollections().toArray();
    if (collections.find((c) => c.name === 'customers')) await database.dropCollection('customers');
    const collection = database.collection('customers');

    for (let index = 0; index < 1000; index++) {
      await collection.insertOne({
        firstName: 'Janis',
        lastName: 'Chase',
        age: Math.floor(Math.random() * 100) + 1
      });
    }

    console.log(await collection.find({ age: { $gte: 50 } }).explain());
    await collection.createIndex({ age: 1 });
    console.log(await collection.find({ age: { $gte: 100 } }).explain());

    console.log('Done!');
  } catch (error) {
    console.log(error);
  } finally {
    await client.close();
  }
}

run();
