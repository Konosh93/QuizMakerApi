process.env.NODE_ENV = 'test';

var mongoose = require('mongoose'),
	User = require('../app/models/user'),
	chai = require('chai'),
	chaiHttp = require('chai-http'),
	server = require('../server');

var should = chai.should();
chai.use(chaiHttp);

describe('User', () => {
	beforeEach((done) => {
		User.remove({}, (err, removed) => {
			var user = new User({ name: 'Ben Aflec', email: 'bat@man.com' });
			user.setPassword('iamben');
			user.save( err => {
				if (err) throw err;
				done();
			})
		});			
	});


	describe('/POST signup', () => {
	    it('it should not POST a new user with an existing email', (done) => {
	      const user = {
	      	  name: 'Ben Simon Aflec',
	          email: 'bat@man.com',
	          password: 'iamben2',
	      };
	      chai.request(server)
	          .post('/api/accounts/signup')
	          .send({user})
	          .end((err, res) => {
	              res.should.have.status(422);
	              res.body.should.be.a('object');
	              res.body.should.have.property('errors');
	              res.body.errors.should.have.property('email');
	              done();
	          });
	    });
  	});

	describe('/POST signup', () => {
	    it('it should not POST a new user without name field', (done) => {
	      const user = {
	      	  //name: "George Reeves",
	          email: "super@man.com",
	          password: "iamgeorge",
	      };
	      chai.request(server)
	          .post('/api/accounts/signup')
	          .send({user})
	          .end((err, res) => {
	              res.should.have.status(422);
	              res.body.should.be.a('object');
	              res.body.should.have.property('errors');
	              res.body.errors.should.have.property('name');
	              done();
	          });
	    });
  	});


	describe('/POST signup', () => {
	    it('it should not POST a new user without password field', (done) => {
	      const user = {
	      	  name: "George Reeves",
	          email: "super@man.com",
	          //password: "iamgeorge",
	      };
	      chai.request(server)
	          .post('/api/accounts/signup')
	          .send({user})
	          .end((err, res) => {
	              res.should.have.status(422);
	              res.body.should.be.a('object');
	              res.body.should.have.property('errors');
	              res.body.errors.should.have.property('password');
	              done();
	          });
	    });
  	});

	describe('/POST signup', () => {
	    it('it should not POST a new user with invalid email field', (done) => {
	      const user = {
	      	  name: "George Reeves",
	          email: "super@man",
	          password: "iamgeorge",
	      };
	      chai.request(server)
	          .post('/api/accounts/signup')
	          .send({user})
	          .end((err, res) => {
	              res.should.have.status(500);
	              done();
	          });
	    });
  	});

	describe('/POST signup', () => {
	    it('it should POST a new user with valid complete data and email field', (done) => {
	      const user = {
	      	  name: 'George Reeves',
	          email: 'super@man.com',
	          password: 'iamgeorge',
	      };
	      chai.request(server)
	          .post('/api/accounts/signup')
	          .send({user})
	          .end((err, res) => {
	              res.should.have.status(201);
	              res.body.should.be.a('object');
	              res.body.should.have.property('user');
	              res.body.user.should.have.property('name');
	              res.body.user.should.have.property('token');
	              done();
	          });
	    });
  	});

	describe('/POST login', () => {
	    it('it should NOT POST user info with wrong password', (done) => {
	      const user = {
	          email: 'bat@man.com',
	          password: 'wrong-password',
	      };
	      chai.request(server)
	          .post('/api/accounts/login')
	          .send({user})
	          .end((err, res) => {
	              res.should.have.status(422);
	              res.body.should.be.a('object');
	              res.body.should.have.property('errors');
	              res.body.err.should.have.property('password');
	              done();
	          });
	    });
  	});



	describe('/POST login', () => {
	    it('it should POST user info and receive a name and token object', (done) => {
	      const user = {
	          email: 'bat@man.com',
	          password: 'iamben',
	      };
	      chai.request(server)
	          .post('/api/accounts/login')
	          .send({user})
	          .end((err, res) => {
	              res.should.have.status(200);
	              res.body.should.be.a('object');
	              res.body.should.have.property('user');
	              res.body.user.should.have.property('name');
	              res.body.user.should.have.property('token');
	              done();
	          });
	    });
  	});

})

