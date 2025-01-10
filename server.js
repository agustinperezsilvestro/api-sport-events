const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const Event = require('./models/Event');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

app.use(express.json()); // Middleware to parse JSON bodies

// Root route
app.get('/', (req, res) => {
    res.send('Welcome to the Sports Event API!');
});

// GET all events
app.get('/events', async (req, res) => {
    try {
        const events = await Event.find();  // Fetch events from MongoDB
        res.json(events);
    } catch (err) {
        res.status(500).send('Server error');
    }
});

// POST a new event
app.post('/events', async (req, res) => {
    const { name, date, location } = req.body;

    try {
        const newEvent = new Event({
            name,
            date,
            location
        });

        await newEvent.save();  // Save to MongoDB
        res.status(201).json(newEvent);
    } catch (err) {
        console.error('Error creating event:', err);  // Log the error here
        res.status(500).send('Server error');
    }
});


// GET event by ID
app.get('/events/:id', async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);  // Find event by MongoDB ID
        if (!event) return res.status(404).send('Event not found');
        res.json(event);
    } catch (err) {
        res.status(500).send('Server error');
    }
});

// PUT update event by ID
app.put('/events/:id', async (req, res) => {
    try {
        let event = await Event.findById(req.params.id);

        if (!event) return res.status(404).send('Event not found');

        // Update the event
        event = Object.assign(event, req.body);
        await event.save();  // Save the updated event

        res.json(event);
    } catch (err) {
        res.status(500).send('Server error');
    }
});

// DELETE event by ID
app.delete('/events/:id', async (req, res) => {
    try {
        const event = await Event.findByIdAndDelete(req.params.id);  // Delete the event
        if (!event) return res.status(404).send('Event not found');
        res.status(204).send();
    } catch (err) {
        res.status(500).send('Server error');
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
