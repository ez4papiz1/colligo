const mongoose = require('mongoose');
const Schema = mongoose.Schema

const ServerDataSchema = new Schema({
    sid: {
        type: Number,
    },
    name: {
        type: String,
    },
    members: [{
        type: String,
    }],
    channels: [{
        type: String,
    }],
    messages: [{
        type: String,
    }]
});

module.exports = mongoose.model('server', ServerDataSchema)