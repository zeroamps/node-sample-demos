const { MongoClient } = require('mongodb');

async function run() {
  const client = new MongoClient('mongodb://localhost:27017');

  try {
    await client.connect();
    const database = client.db('test');
    const collection = database.collection('customers');

    // Create
    console.log(
      await collection.insertOne({
        firstName: 'Janis',
        lastName: 'Chase',
        age: 22
      })
    );

    console.log(
      await collection.insertMany([
        {
          firstName: 'Dillard',
          lastName: 'Gross',
          age: 35
        },
        {
          firstName: 'Arline',
          lastName: 'Brewer',
          age: 59
        },
        {
          firstName: 'Juana',
          lastName: 'Pratt',
          age: 55
        }
      ])
    );

    // Read
    console.log(await collection.findOne({ age: { $eq: 59 } }));
    console.log(await collection.find().sort({ age: 1 }).toArray());

    // Update
    console.log(await collection.updateOne({ age: { $eq: 59 } }, { $set: { age: 99 } }));
    console.log(await collection.updateMany({ age: { $in: [22, 35] } }, { $set: { age: 99 } }));

    // Delete
    console.log(await collection.deleteOne({ age: { $eq: 99 } }));
    console.log(await collection.deleteMany({}));
  } catch (error) {
    console.log(error);
  } finally {
    await client.close();
  }
}

run();
