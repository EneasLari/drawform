const mongoose = require('mongoose');
const config = require('../config/config')
mongoose.Promise = global.Promise
mongoose.connect(config.mongoUri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
mongoose.connection.on('error', function() {
    throw new Error(`unable to connect to database: ${mongoUri}`)
})
module.exports = mongoose;