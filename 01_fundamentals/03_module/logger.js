//(function (exports, require, module, __filename, __dirname) {

function log(message) {
  console.log(message);
}

function warn(message) {
  console.log(message);
}

function error(message) {
  console.error(message);
}

module.exports = { log, warn, error };

// or

// module.exports.log = log;
// module.exports.warn = warn;
// module.exports.error = error;

//});
