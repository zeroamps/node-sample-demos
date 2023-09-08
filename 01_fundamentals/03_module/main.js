//(function (exports, require, module, __filename, __dirname) {

const logger = require('./logger');
const { log, warn, error } = require('./logger');

console.log(module);
console.log(exports);
console.log(module.exports);
console.log(__filename);
console.log(__dirname);

console.log(logger);

logger.log('Hello, log!');
logger.warn('Hello, warn!');
logger.error('Hello, error!');

log('Hello, log!');
warn('Hello, warn!');
error('Hello, error!');

//});
