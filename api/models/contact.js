const mongoose = require('mongoose')
const Schema = mongoose.Schema

const contact = new Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    subject: {
        type: String
    },
    content: {
        type: String
    }
},{
    timestamps: true
})

mongoose.model('Contact', contact)

