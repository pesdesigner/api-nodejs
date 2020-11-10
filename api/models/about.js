const mongoose = require('mongoose')
const Schema = mongoose.Schema

const about = new Schema({
    title: {
        type: String
    },
    desc: {
        type: String
    },
    originName: {
        type: String
    },
    fileName: {
        type: String
    }
},{
    timestamps: true
})

mongoose.model('About', about)

