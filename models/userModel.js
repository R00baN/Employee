const mongoose = require('mongoose')

const Users = new mongoose.Schema({
        email: {
            type: String
        },
        password: {
            type: String
        },
        title: {
            type: String
        },
        firstName: {
            type: String
        },
        lastName: {
            type: String
        },
        role: {
            type: String
        },
})

module.exports = mongoose.model('user', Users)