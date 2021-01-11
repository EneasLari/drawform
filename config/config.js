const dotenv = require('dotenv');
dotenv.config();
const config = {
    env: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 4000,
    jwtSecret: process.env.JWT_SECRET || "YOUR_secret_key",
    mongoUri: "mongodb+srv://eneas:" + process.env.DBpassword + "@cluster0.qi3tp.mongodb.net/drawormDB?retryWrites=true&w=majority" || process.env.MONGODB_URI ||
        process.env.MONGO_HOST ||
        'mongodb://' + (process.env.IP || 'localhost') + ':' +
        (process.env.MONGO_PORT || '27017') +
        '/drawormDB'
}

module.exports = config