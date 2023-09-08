const EventEmitter = require('events');

const emitter = new EventEmitter();

emitter.on('send', (arg) => {
  console.log(arg.message);
});

emitter.emit('send', { message: 'Hello, emitter!' });
