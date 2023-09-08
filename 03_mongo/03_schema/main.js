const { MongoClient } = require('mongodb');

async function run() {
  const client = new MongoClient('mongodb://localhost:27017');

  try {
    await client.connect();
    const database = client.db('test');

    const collections = await database.listCollections().toArray();
    if (collections.find((c) => c.name === 'customers')) await database.dropCollection('customers');

    const collection = await database.createCollection('customers', {
      validator: {
        $jsonSchema: {
          bsonType: 'object',
          required: ['firstName', 'lastName', 'age'],
          properties: {
            _id: { bsonType: 'objectId' },
            firstName: { bsonType: 'string' },
            lastName: { bsonType: 'string' },
            age: { bsonType: 'number' }
          },
          additionalProperties: false
        }
      }
    });

    // Create
    console.log(
      await collection.insertOne({
        firstName: 'Janis',
        lastName: 'Chase',
        age: 22
      })
    );
  } catch (error) {
    console.log(error);
  } finally {
    await client.close();
  }
}

run();
