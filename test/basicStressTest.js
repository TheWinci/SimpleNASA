const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();

const server = require('../index');

chai.use(chaiHttp);

describe('Forks', () => {
  describe('GET /', () => {
    it('testing forks?', (done) =>  {
      chai.request(server)
        .get('/')
        .end((error, response) => {
          response.should.have.status(200);
          response.body.should.have.property('message');
          console.log(response.body);
        });
        done();
    });
  });
});