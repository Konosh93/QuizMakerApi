/*
process.env.NODE_ENV = 'test';

var mongoose = require('mongoose'),
	User = require('../app/models/user'),
	Quiz = require('../app/models/quiz'),
	chai = require('chai'),
	chaiHttp = require('chai-http'),
	server = require('../server');

var should = chai.should();
chai.use(chaiHttp);

describe('Quiz', () => {
	let credentials;
	beforeEach((done) => {
		User.remove({}, (err, removed) => {
			var user = new User({ name: 'Ben Aflec', email: 'bat@man.com' });
			user.setPassword('iamben');
			user.save( err => {
				if (err) throw err;
			})
			credentials = user.toAuthJSON();
			done();
		});			
	});

	beforeEach((done) => {
		Quiz.remove({}, (err) => {
			done();
		});			
	});


	describe('GET /api/quizes', () => {
		it('it should get all the quizes', (done) => {
			chai.request(server)
				.get('/api/quizes')
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.a('array');
					res.body.length.should.be.eql(0);
				});
			done();
		});
	})

	describe('/POST quiz', () => {
	    it('it should not POST a quiz without title field', (done) => {
	      const quiz = {
	      	  //title: "Founders",
	          problems: [{question: "Who founded Amazon?", choices:["Jeff Bezos", "Bill Gates", "Steve Jobs"], correct: "Jeff Bezos"}],
	      };
	      chai.request(server)
	          .post('/api/quizes')
	          .set('Authorization', `Token ${credentials.token}`)
	          .send({quiz})
	          .end((err, res) => {
	              res.should.have.status(422);
	              res.body.should.be.a('object');
	              res.body.should.have.property('errors');
	              res.body.errors.should.have.property('title');
	              done();
	          });
	        
	    });
  	});

	describe('/POST quiz', () => {
	    it('it should not POST a quiz without problems array', (done) => {
	      const quiz = {
	      	  title: "Founders",
	          //problems: [{question: "Who founded Amazon?", choices:["Jeff Bezos", "Bill Gates", "Steve Jobs"], correct: "Jeff Bezos"}],
	      };
	      chai.request(server)
	          .post('/api/quizes')
	          .set('Authorization', `Token ${credentials.token}`)
	          .send({quiz})
	          .end((err, res) => {
	              res.should.have.status(422);
	              res.body.should.be.a('object');
	              res.body.should.have.property('errors');
	              res.body.errors.should.have.property('problems');
	              done();
	          });
	        
	    });
  	});


	describe('/POST quiz', () => {
	    it('it should not POST a quiz without VALID problems array', (done) => {
	      const quiz = {
	      	  title: "Founders",
	          problems: {question: "Who founded Amazon?", choices:["Jeff Bezos", "Bill Gates", "Steve Jobs"], correct: "Jeff Bezos"},
	      };
	      chai.request(server)
	          .post('/api/quizes')
	          .set('Authorization', `Token ${credentials.token}`)
	          .send({quiz})
	          .end((err, res) => {
	              res.should.have.status(422);
	              res.body.should.be.a('object');
	              res.body.should.have.property('errors');
	              res.body.errors.should.have.property('problems');
	              done();
	          });
	        
	    });
  	});

	describe('/POST quiz', () => {
	    it('it should not POST a quiz without proper user credentials', (done) => {
	      const quiz = {
	      	  title: "Founders",
	          //problems: [{question: "Who founded Amazon?", choices:["Jeff Bezos", "Bill Gates", "Steve Jobs"], correct: "Jeff Bezos"}],
	      };
	      chai.request(server)
	          .post('/api/quizes')
	          .set('Authorization', `Token ImproperCredentials`)
	          .send({quiz})
	          .end((err, res) => {
	              res.should.have.status(401);
	              done();
	        });
	    });
  	});


	describe('/POST quiz', () => {
	    it('it should POST a quiz', (done) => {
	      const quiz = {
	      	  title: "Founders",
	          problems: [{question: "Who founded Amazon?", choices:["Jeff Bezos", "Bill Gates", "Steve Jobs"], correct: "Jeff Bezos"}],
	      };
	      chai.request(server)
	          .post('/api/quizes')
	          .set('Authorization', `Token ${credentials.token}`)
	          .send({quiz})
	          .end((err, res) => {
	              res.should.have.status(200);
	              res.body.should.be.a('object');
	              res.body.should.not.have.property('errors');
	              res.body.should.have.property('message').eql('success');
	              res.body.should.have.property('quiz');
	              res.body.quiz.should.be.a('object');
	              done();
	          });
	        
	    });
  	});

})

*/