const mongoose = require('mongoose');


const articleSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        shortDescription: {
            type: String,
            required: true
        },
        markdown: {
            type: String,
            required: true
        },
        creationDate: {
            type: Date,
            default: Date.now
        }
    }
);


module.exports = mongoose.model('Article', articleSchema);