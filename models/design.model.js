var mongoose = require('./db')
const Schema = mongoose.Schema;

const DesignSchema = new mongoose.Schema({
    Description: {
        type: String,
        trim: true,
    },
    ShortDescription: {
        type: String,
        trim: true,
        required: 'Short description of design is required'
    },
    Image: {
        type: String,
        trim: true
    },
    Price: {
        type: String,
        trim: true
    },
    UserId: {
        type: Schema.ObjectId,
        ref: 'User',
        trim: true,
        required: 'there is no user who creted the design'
    },
    IsPublished: {
        type: Boolean,
        required: false
    },
    IsDeleted: {
        type: Boolean,
        required: false
    }
})

var Design = mongoose.model('Designs', DesignSchema);
module.exports = Design;