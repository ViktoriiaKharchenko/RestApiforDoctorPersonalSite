const mongoose = require('mongoose');
const {mongoUri} = require('../config/app')

mongoose
    .connect(mongoUri, { useNewUrlParser: true })
    .catch(e => {
        console.error('Connection error', e.message)
    })

const db = mongoose.connection

module.exports = db