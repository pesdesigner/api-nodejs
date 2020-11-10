const mongoose = require('mongoose')
const Schema = mongoose.Schema

const home = new Schema({
    topTitle: {
        type: String
    },
    topSubtitle: {
        type: String
    },
    textBtn: {
        type: String
    },
    linkBtn: {
        type: String
    }
})
mongoose.model('Home', home)

