const EventEmitter = require('events')

class MyEmitter extends EventEmitter {}

const myEmitter = new MyEmitter()

myEmitter.on('event', function (a, b){
  console.log(a, b, this, this === myEmitter)
})

myEmitter.on('event', (a, b) => {
  console.log(a, b, this, this === myEmitter)
})

myEmitter.emit('event', 'a', {name:'wdd'})