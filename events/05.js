const EventEmitter = require('events')

class MyEmitter extends EventEmitter {}

const myEmitter = new MyEmitter()

myEmitter.on('error', (err) => {
  console.log(err)
})

console.log(1)
myEmitter.emit('error', new Error('test'))
console.log(2)
