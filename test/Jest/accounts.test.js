process.env.NODE_ENV = 'test';

var mongoose = require('mongoose'),
	User = require('../../app/models/user'),
	chai = require('chai'),
	chaiHttp = require('chai-http'),
	server = require('../../server');

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
	              expect(res.status).toBe(422);
	              expect(typeof res.body).toBe('object');
	              expect(res.body).toHaveProperty('errors');
	              expect(res.body.errors).toHaveProperty('message');  
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
	              expect(res.status).toBe(422);
	              expect(typeof res.body).toBe('object');
	              expect(res.body).toHaveProperty('errors');
	              expect(res.body.errors).toHaveProperty('message');  
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
	              expect(res.status).toBe(422);
	              expect(typeof res.body).toBe('object');
	              expect(res.body).toHaveProperty('errors');
	              expect(res.body.errors).toHaveProperty('message');              
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
	              expect(res.status).toBe(422);
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
	              expect(res.status).toBe(422);
	              expect(typeof res.body).toBe('object');
	              expect(res.body).toHaveProperty('errors');
	              expect(res.body.errors).toHaveProperty('message');
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
	              expect(res.status).toBe(200);
	              expect(typeof res.body).toBe('object');
	              expect(res.body).toHaveProperty('user');
	              expect(res.body.user).toHaveProperty('name');
	              expect(res.body.user).toHaveProperty('token');
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
	              expect(res.status).toBe(201);
	              expect(typeof res.body).toBe('object');
	              expect(res.body).toHaveProperty('user');
	              expect(res.body.user).toHaveProperty('name');
	              expect(res.body.user).toHaveProperty('token');
	              done();
	          });
	    });
  	});

	describe('/get recall', () => {
	    it('it should NOT GET user info and receive a name and token object based on wrong-token auth', (done) => {
	      const user = {
	          email: 'bat@man.com',
	          password: 'iamben',
	      };
	      chai.request(server)
	          .post('/api/accounts/login')
	          .send({user})
	          .end((err, res) => {
	              expect(res.status).toBe(200);
	              expect(typeof res.body).toBe('object');
	              expect(res.body).toHaveProperty('user');
	              expect(res.body.user).toHaveProperty('name');
	              expect(res.body.user).toHaveProperty('token')
	              chai.request(server)
	                .get('/api/accounts/recall')
	                .set('Authorization', `Token ${"wrong-token"}`)
	                .end((err2, res2) => {
	             	  expect(res2.status).toBe(422);
	             	  expect(typeof res2.body).toBe('object');
	             	  expect(res2.body).toHaveProperty('errors');
	             	  expect(res2.body.errors).toHaveProperty('message');	 
	             	  done();               		
	                })
	          });
	    });
  	});

	describe('/get recall', () => {
	    it('it should get user info and receive a name and token object based on token auth', (done) => {
	      const user = {
	          email: 'bat@man.com',
	          password: 'iamben',
	      };
	      chai.request(server)
	          .post('/api/accounts/login')
	          .send({user})
	          .end((err, res) => {
	              expect(res.status).toBe(200);
	              expect(typeof res.body).toBe('object');
	              expect(res.body).toHaveProperty('user');
	              expect(res.body.user).toHaveProperty('name');
	              expect(res.body.user).toHaveProperty('token');
	              chai.request(server)
	                .get('/api/accounts/recall')
	                .set('Authorization', `Token ${res.body.user.token}`)
	                .end((err2, res2) => {
	             	  expect(res2.status).toBe(200);
	             	  expect(typeof res2.body).toBe('object');
	             	  expect(res2.body).toHaveProperty('user');
	             	  expect(res2.body.user).toHaveProperty('name');
	             	  expect(res2.body.user).toHaveProperty('token');	 
	             	  done();               		
	                })
	          });
	    });
  	});
})

