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

const session = require('express-session');
const sharedSession = require('express-socket.io-session');
const userSessions = {}; //mapping of socket ID to user session */

app.use(cors());

// Session setup
 const sessionMiddleware = session({
  secret: 'secretkey',
  resave: true,
  saveUninitialized: true,
}); 

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('views', './DiscordCode/FrontEnd/views');
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/DiscordCode/FrontEnd/'));
app.use(sessionMiddleware); 

// Share session with io
io.use(sharedSession(sessionMiddleware)); 



app.get('/', function(req, res) {
  res.render('home');
});

app.get('/login', (req, res) => {
  res.render('login');
});
app.use(function(req, res, next) {
  res.locals.username = req.session.name;
  next();
});
app.get('/signup', (req, res) => {
  res.render('signup');
});

app.get('/ServerPage', (req, res) => {
  res.render('ServerPage');
});

app.get('/VideoCall', (req, res) => {
  res.render('VideoCall');
});
app.get('/voice-call/:serverId', (req, res) => {
  const serverId = req.params.serverId; 
  const username = req.session.name;
  req.session.save();
  res.render('voice-call', { serverId, username });
});

app.get('/searchServer', (req, res) => {
  res.render('SearchPage');
});


const login = require('./DiscordCode/BackEnd/routes/login.js');
const signup = require('./DiscordCode/BackEnd/routes/signup.js');
const ServerPage = require('./DiscordCode/BackEnd/routes/fetchServerData.js');
const fetchServerData = require('./DiscordCode/BackEnd/routes/fetchServerData.js');
const displayServer = require('./DiscordCode/BackEnd/routes/displayServer.js');
const createServer = require('./DiscordCode/BackEnd/routes/createServer.js');
const createChannel = require('./DiscordCode/BackEnd/routes/createChannel.js');
const fetchUserServers = require('./DiscordCode/BackEnd/routes/fetchUserServers.js');
const accountSettings = require('./DiscordCode/BackEnd/routes/AccountSettings.js');
const searchResults = require('./DiscordCode/BackEnd/routes/searchResults.js'); 
const FriendAdd = require('./DiscordCode/BackEnd/routes/FriendAdd.js');
const friendpage = require('./DiscordCode/BackEnd/routes/friendpage.js');


app.use('/createServer', createServer);
app.use('/createChannel', createChannel);
app.use('/fetchServerData', fetchServerData);
app.use('/displayServer', displayServer);
app.use('/signup', signup);
app.use('/login', login);
app.use('/serverpage', ServerPage);
app.use('/fetchUserServers', fetchUserServers);
app.use('/AccountSettings', accountSettings);
app.use('/searchResults', searchResults);
app.use('/FriendAdd', FriendAdd);
app.use('/friendpage', friendpage);


 io.use(sharedSession(sessionMiddleware)); 

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
          console.log(messages);
          socket.emit('channelMessages', messages); 
      }).catch(err => console.log(err));
  });
  const userEmail = socket.handshake.session.email;
  if (!userEmail) {
      console.log('User email not found in session.');
      return;
  } 
   console.log(`${userEmail} connected for video calling.`); 
   socket.on('initiate-call', ({ calleeEmail }) => {
      const calleeSocketId = Object.keys(io.sockets.sockets).find(key => io.sockets.sockets[key].handshake.session.email === calleeEmail);
      if (calleeSocketId) {
          io.to(calleeSocketId).emit('incoming-call', { from: userEmail });
          console.log(`Call initiated from ${userEmail} to ${calleeEmail}`);
      } else {
          socket.emit('call-error', `User ${calleeEmail} is not online.`);
      }
  }); 
  socket.on('send-message2', (message , name) => {
    socket.broadcast.emit('receive-message2', message );
});
socket.on('join-voice-call', ({ serverId, signalData, username }) => {
  socket.join(serverId);
  socket.to(serverId).emit('user-joined', { signalData, username });
  socket.to(serverId).emit('request-signal', { username });
});
socket.on('send-signal', ({ serverId, signalData, username }) => {
  socket.to(serverId).emit('signal', { signalData, username });
});
socket.on('request-signal', ({ serverId, username }) => {
  socket.to(serverId).emit('request-signal', { username });
});
});
server.listen(port, () => {
  console.log(`listening on *:${port}`);
});
