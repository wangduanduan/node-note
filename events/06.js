const EventEmitter = require('events')

class MyEmitter extends EventEmitter {}

const myEmitter = new MyEmitter()

myEmitter.on('newListener', (event, listener) => {
  console.log('----')
  console.log(event)
  console.log(listener)
})

myEmitter.on('myEmitter', (err) => {
  console.log(err)
})
