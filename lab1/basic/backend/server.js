const express = require('express')
const app = express()
const port = 8000
const host = '0.0.0.0'

app.get('/', (req, res) => {
  res.send('this text was received from the server')
})

app.listen(port, host, () => {
  console.log(`Example app listening on port ${port}`)
})
