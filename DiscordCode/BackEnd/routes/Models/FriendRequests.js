const mongoose = require('mongoose');
const Schema = mongoose.Schema

const FriendRequestSchema = new Schema({
    sendid: {
        type: Number,
    },
    recid: {
        type: Number,
        required: true
    },
    recname: {
        type: String,
    },
    sendname: {
        type: String,
    },
});

module.exports = mongoose.model('FriendRequests', FriendRequestSchema)