const fs = require('fs');

// sync function shouldn't be used
const files = fs.readdirSync('./');
console.log(files);

// async function should be used
fs.readdir('./', (err, files) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log(files);
});
