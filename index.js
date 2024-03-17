const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/colligo');
const db = mongoose.connection;
const express = require('express')
const app = express();
const port = 3000;

app.use(express.json());
app.set('views', './DiscordCode/FrontEnd/views');
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/DiscordCode/FrontEnd/'));


const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

app.get('/', function(req, res) {
  res.render('login');
});

const User = mongoose.model('User', userSchema);

const login = require('./DiscordCode/BackEnd/routes/login.js');
const signup = require('./DiscordCode/BackEnd/routes/signup.js');
const ServerPage = require('./DiscordCode/BackEnd/routes/ServerBackEnd.js');

app.use('/signup', signup);
app.use('/login', login);
app.use('/serverpage', ServerPage);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})