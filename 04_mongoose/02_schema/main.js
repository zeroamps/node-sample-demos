const mongoose = require('mongoose');

async function run() {
  await mongoose.connect('mongodb://localhost:27017/test');

  new mongoose.Schema({ name: String });
  new mongoose.Schema({ name: 'String' });
  new mongoose.Schema({ name: mongoose.Schema.Types.String });

  new mongoose.Schema({ name: { type: String } });
  new mongoose.Schema({ name: { type: 'String' } });
  new mongoose.Schema({ name: { type: mongoose.Schema.Types.String } });
  new mongoose.Schema({ name: { type: String, required: true, default: 'Bill' } });
  new mongoose.Schema({ name: { type: String, index: true, unique: true } });
  new mongoose.Schema({ name: { type: String, lowercase: true, trim: true, minlength: 5 } });
  new mongoose.Schema({ age: { type: Number, min: 18, max: 180 } });
}

run().catch((error) => console.log(error));
