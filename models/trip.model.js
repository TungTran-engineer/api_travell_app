
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tripSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    imageUrl: {
        type: String,
    },
    description: {
        type: String,
    }
}, { timestamps: true });

module.exports = mongoose.model('Trip', tripSchema);

