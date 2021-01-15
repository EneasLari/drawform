var mongoose = require('./db')
const Schema = mongoose.Schema;

const DesignSchema = new mongoose.Schema({
    Description: {
        type: String,
        trim: true,
        required: 'Main body of article is required'
    },
    ShortDescription: {
        type: String,
        trim: true,
        required: 'Short description of article is required'
    },
    Image: {
        type: String,
        trim: true
    },
    UserId: {
        type: Schema.ObjectId,
        ref: 'User',
        trim: true,
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