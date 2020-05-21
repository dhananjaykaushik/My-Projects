const mongoose = require('mongoose');
const ShortId = require('shortid');

const urlSchema = new mongoose.Schema(
    {
        minifiedUrl: {
            type: String,
            required: true,
            default: ShortId.generate
        },
        originalUrl: {
            type: String,
            required: true
        },
        count: {
            type: Number,
            required: true,
            default: 0
        },
        creationDate: {
            type: Date,
            default: Date.now
        }
    }
);


module.exports = mongoose.model('Url', urlSchema);
