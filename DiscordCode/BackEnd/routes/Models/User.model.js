const mongoose = require('mongoose');
const Schema = mongoose.Schema

const UserSchema = new Schema({
    uid: {
        type: Number,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    friendlist: [{
        type: String,
    }]
})

module.exports = mongoose.model('user', UserSchema)
