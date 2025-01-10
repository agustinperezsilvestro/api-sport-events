import { expect } from 'chai';  // Destructure 'expect' directly
import chaiHttp from 'chai-http';
import { app } from '../server.js'; // Import 'app' from server.js

chai.use(chaiHttp);  // Enable chai-http for HTTP assertions

describe('Sports Event API', () => {
  // Test the GET /events route
  describe('GET /events', () => {
    it('should get all events', (done) => {
      chai
        .request(app)  // Use 'app' here instead of 'server'
        .get('/events')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.a('array');
          done();
        });
    });
  });

  // Test the POST /events route
  describe('POST /events', () => {
    it('should create a new event', (done) => {
      const event = {
        name: 'Football Match',
        date: '2025-12-01T12:00:00Z',
        location: 'Stadium A',
      };
      
      chai
        .request(app)  // Use 'app' here instead of 'server'
        .post('/events')
        .send(event)
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body).to.have.property('name').eq(event.name);
          expect(res.body).to.have.property('date').eq(event.date);
          expect(res.body).to.have.property('location').eq(event.location);
          done();
        });
    });
  });

  // Test the GET /events/:id route
  describe('GET /events/:id', () => {
    it('should get a single event by ID', (done) => {
      const eventId = 'yourEventIdHere'; // Use a valid event ID from your DB
      
      chai
        .request(app)  // Use 'app' here instead of 'server'
        .get(`/events/${eventId}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.a('object');
          done();
        });
    });
  });

  // Test the PUT /events/:id route
  describe('PUT /events/:id', () => {
    it('should update an event by ID', (done) => {
      const eventId = 'yourEventIdHere'; // Use a valid event ID from your DB
      const updatedEvent = {
        name: 'Updated Football Match',
        date: '2025-12-02T12:00:00Z',
        location: 'Updated Stadium A',
      };

      chai
        .request(app)  // Use 'app' here instead of 'server'
        .put(`/events/${eventId}`)
        .send(updatedEvent)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('name').eq(updatedEvent.name);
          expect(res.body).to.have.property('date').eq(updatedEvent.date);
          expect(res.body).to.have.property('location').eq(updatedEvent.location);
          done();
        });
    });
  });

  // Test the DELETE /events/:id route
  describe('DELETE /events/:id', () => {
    it('should delete an event by ID', (done) => {
      const eventId = 'yourEventIdHere'; // Use a valid event ID from your DB

      chai
        .request(app)  // Use 'app' here instead of 'server'
        .delete(`/events/${eventId}`)
        .end((err, res) => {
          expect(res).to.have.status(204);
          done();
        });
    });
  });
});
