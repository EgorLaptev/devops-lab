const express = require('express')
const mysql = require('mysql2');
const app = express()
const port = 3000
const host = '0.0.0.0'
app.listen(port, host, () => {
  console.log(`Example app listening on port ${port}`)
})

const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST || 'localhost',
  user: process.env.MYSQL_USER || 'user',
  password: process.env.MYSQL_PASSWORD || 'password',
  database: process.env.MYSQL_DATABASE || 'mydb',
});

app.get('/', (req, res) => {
  connection.connect((err) => {

    if (err) {
      res.send('connection error: ' + err.stack);
      return;
    }
    res.send('success')
  });
})