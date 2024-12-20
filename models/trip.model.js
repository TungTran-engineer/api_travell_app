const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
    title: { type: String, required: true },
    location: { type: String, required: true },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    imageUrl: { type: String },
    description: { type: String },
    guide: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Trip', tripSchema);
