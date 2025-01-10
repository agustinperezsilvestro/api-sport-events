import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server'; // Import your server

chai.should();
chai.use(chaiHttp);

describe('Sports Event API', () => {
  // Test the GET /events route
  describe('GET /events', () => {
    it('should get all events', (done) => {
      chai
        .request(server)
        .get('/events')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
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
        .request(server)
        .post('/events')
        .send(event)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.have.property('name').eq(event.name);
          res.body.should.have.property('date').eq(event.date);
          res.body.should.have.property('location').eq(event.location);
          done();
        });
    });
  });

  // Test the GET /events/:id route
  describe('GET /events/:id', () => {
    it('should get a single event by ID', (done) => {
      const eventId = 'yourEventIdHere'; // Use a valid event ID from your DB
      
      chai
        .request(server)
        .get(`/events/${eventId}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
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
        .request(server)
        .put(`/events/${eventId}`)
        .send(updatedEvent)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('name').eq(updatedEvent.name);
          res.body.should.have.property('date').eq(updatedEvent.date);
          res.body.should.have.property('location').eq(updatedEvent.location);
          done();
        });
    });
  });

  // Test the DELETE /events/:id route
  describe('DELETE /events/:id', () => {
    it('should delete an event by ID', (done) => {
      const eventId = 'yourEventIdHere'; // Use a valid event ID from your DB

      chai
        .request(server)
        .delete(`/events/${eventId}`)
        .end((err, res) => {
          res.should.have.status(204);
          done();
        });
    });
  });
});
