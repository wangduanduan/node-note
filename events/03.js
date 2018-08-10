const EventEmitter = require('events')

class MyEmitter extends EventEmitter {}

const myEmitter = new MyEmitter()

myEmitter.on('event', () => {
  console.log('01 an event occurred!')
})

myEmitter.on('event', () => {
  console.log('02 an event occurred!')
})

console.log(1)
myEmitter.emit('event')
console.log(2)
