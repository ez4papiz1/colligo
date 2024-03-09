const express = require('express')
const app = express()
const port = 3000

app.use(express.json());

const login = require('./login.js');
const signup = require('./signup.js'); 

app.use('/signup', signup);
app.use('/login', login);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})