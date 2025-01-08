const mongoose = require('mongoose');

// Event schema
const eventSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    location: {
        type: String,
        required: true
    }
});

// Event model
const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
