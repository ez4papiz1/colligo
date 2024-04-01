const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const cors = require('cors');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const router = express.Router();

if (!mongoose.connection.readyState) {
    mongoose.connect('mongodb://localhost:27017/colligo', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));
}

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname + '/FrontEnd'));
const User = require('./Models/User.model.js');

app.post('/call', async (req, res) => {
    const { callerEmail, calleeEmail } = req.body;

    try {
        // Find caller and callee by email addresses
        const caller = await User.findOne({ email: callerEmail });
        const callee = await User.findOne({ email: calleeEmail });

        if (!caller || !callee) {
            return res.status(404).json({ message: 'User not found' });
        }

        // notification
        io.to(calleeEmail).emit('incoming-call', { caller: caller.name });

        res.status(200).json({ message: 'Call initiated successfully' });
    } catch (err) {
        console.error('Error initiating call:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});

module.exports = router;
