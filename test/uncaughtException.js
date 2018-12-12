process.on('uncaughtException', (err) => {
  console.log(`Caught exception: ${err}\n`)
})

setTimeout(() => {
  console.log('This will still run.')
}, 500)

// Intentionally cause an exception, but don't catch it.
nonexistentFunc()
console.log('This will not run.')
