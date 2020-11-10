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
    },
    servTitle: {
        type: String
    },
    servSubtitle: {
        type: String
    },
    icon1: {
        type: String
    },
    title1: {
        type: String
    },
    desc1: {
        type: String
    },
    icon2: {
        type: String
    },
    title2: {
        type: String
    },
    desc2: {
        type: String
    },
    icon3: {
        type: String
    },
    title3: {
        type: String
    },
    desc3: {
        type: String
    },
},{
    timestamps: true
})

mongoose.model('Home', home)

