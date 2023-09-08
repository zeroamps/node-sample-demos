const { MongoClient } = require('mongodb');

async function run() {
  const client = new MongoClient('mongodb://localhost:27017');

  try {
    await client.connect();
    const result = await client.db().admin().listDatabases();
    result.databases.forEach((database) => console.log(database));
  } catch (error) {
    console.log(error);
  } finally {
    await client.close();
  }
}

run();
