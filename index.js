const mongoose = require('mongoose');
const db = mongoose.connection;
const express = require('express')
const app = express();
const port = 3000;
const http = require('http');
const server = http.createServer(app);
const { Server } =  require('socket.io');
const io = new Server(server);
const cors = require('cors');
const ServerData = require('./DiscordCode/BackEnd/routes/Models/ServerData');
mongoose.createConnection("mongodb+srv://Jordan:test123@colligo.jfv09qu.mongodb.net/?retryWrites=true&w=majority&appName=Colligo" , { useNewUrlParser: true, useUnifiedTopology: true })

app.use(cors());

app.use(express.json());
app.set('views', './DiscordCode/FrontEnd/views');
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/DiscordCode/FrontEnd/'));


app.get('/', function(req, res) {
  res.render('login');
});

const login = require('./DiscordCode/BackEnd/routes/login.js');
const signup = require('./DiscordCode/BackEnd/routes/signup.js');
const ServerPage = require('./DiscordCode/BackEnd/routes/fetchServerData.js');
const fetchServerData = require('./DiscordCode/BackEnd/routes/fetchServerData.js');
const displayServer = require('./DiscordCode/BackEnd/routes/displayServer.js');
const createServer = require('./DiscordCode/BackEnd/routes/createServer.js');
const createChannel = require('./DiscordCode/BackEnd/routes/createChannel.js');
const fetchUserServers = require('./DiscordCode/BackEnd/routes/fetchUserServers.js');


app.use('/createChannel', createChannel);
app.use('/createServer', createServer);
app.use('/fetchServerData', fetchServerData);
app.use('/displayServer', displayServer);
app.use('/signup', signup);
app.use('/login', login);
app.use('/serverpage', ServerPage);
app.use('/fetchUserServers', fetchUserServers);

io.on ('connection', (socket) => {
    console.log('a user connected');
    socket.on('send-message', ({ message, channelName, serverId}) => {
        console.log('message: ' + message);
        socket.broadcast.emit('receive-message', message);
        ServerData.findOneAndUpdate(
          { _id: serverId, 'channels.name': channelName },
          { $push: { 'channels.$.messages': message } },
          { new: true }
      ).then(updatedServer => {
          if (!updatedServer) {
              console.log('Error updating server data');
              return;
          }
          console.log('Message added to channel');
      }).catch(err => console.log(err));
    });
    socket.on('channelSelected', ({ serverId, channelName }) => {
      ServerData.findOne({ 
          '_id': serverId, 
          'channels.name': channelName 
      }, 'channels.$')
      .then(server => {
          const messages = server.channels[0].messages;
          socket.emit('channelMessages', messages); 
      }).catch(err => console.log(err));
  });
});
server.listen(port, () => {
  console.log(`listening on *:${port}`);
});
