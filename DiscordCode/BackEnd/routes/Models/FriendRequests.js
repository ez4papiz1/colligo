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
    acc: {
        type: Boolean,
        default: false
    },
});

module.exports = mongoose.model('FriendRequests', FriendRequestSchema)