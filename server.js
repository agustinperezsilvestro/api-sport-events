const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json()); // Middleware to parse JSON bodies

// Dummy data for events
let events = [
    { id: 1, name: 'Football Match', date: '2025-03-12', location: 'Stadium A' },
    { id: 2, name: 'Basketball Tournament', date: '2025-03-15', location: 'Arena B' }
];

// GET all events
app.get('/events', (req, res) => {
    res.json(events);
});

// POST a new event
app.post('/events', (req, res) => {
    const newEvent = req.body;
    newEvent.id = events.length + 1;  // Auto-assign an ID
    events.push(newEvent);
    res.status(201).json(newEvent);
});

// GET event by ID
app.get('/events/:id', (req, res) => {
    const event = events.find(e => e.id === parseInt(req.params.id));
    if (!event) return res.status(404).send('Event not found');
    res.json(event);
});

// PUT update event by ID
app.put('/events/:id', (req, res) => {
    // Find the event by ID
    let event = events.find(e => e.id === parseInt(req.params.id));

    // If the event doesn't exist, return a 404 with an error message
    if (!event) {
        console.log(`Event with ID ${req.params.id} not found.`);
        return res.status(404).send('Event not found');
    }
    
    // Merge the new data with the existing event data
    event = { ...event, ...req.body };
    
    // Replace the old event with the updated one in the array
    events = events.map(e => e.id === parseInt(req.params.id) ? event : e);

    // Return the updated event
    res.json(event);
});

// DELETE event by ID
app.delete('/events/:id', (req, res) => {
    const eventIndex = events.findIndex(e => e.id === parseInt(req.params.id));
    if (eventIndex === -1) return res.status(404).send('Event not found');
    
    events.splice(eventIndex, 1);
    res.status(204).send();
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
