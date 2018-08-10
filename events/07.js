const EventEmitter = require('events')

class MyEmitter extends EventEmitter {}

const myEmitter = new MyEmitter()

const maxListeners = 11

for (let i = 0; i < maxListeners; i++) {
  myEmitter.on('event', (err) => {
    console.log(err, 1)
  })
}

myEmitter.on('event1', (err) => {
  console.log(err, 11)
})

console.log(myEmitter.listenerCount('event'))
console.log(EventEmitter.defaultMaxListeners)
console.log(myEmitter.getMaxListeners())
console.log(myEmitter.eventNames())
