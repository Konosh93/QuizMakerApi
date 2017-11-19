var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var slug = require('slug');
var User = mongoose.model('User');

var QuizSchema = new mongoose.Schema({
	title: String,
	slug: {type: String, unique: true, lowercase: true},
	user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
	problems: [
		{
			question: {type: String},
			choices: [{type: String}],
			correct: String,
		}
	],
}, {timestamps: true});

QuizSchema.plugin(uniqueValidator, {message: 'is already taken'});

QuizSchema.pre('validate', function(next) {
	if (!this.slug) {
		this.slugify();
	}
	next();
});

QuizSchema.methods.slugify = function() {
	this.slug = slug(this.title)  +'-' + new Date().getTime() +'-' +(Math.random() * Math.pow(36, 6) | 0).toString(36);
}

QuizSchema.methods.takeQuiz = () =>  {
	const problems = this.problems.map(p => ({
		question: p.question,
		choices: p.choices,
	}));
	return {
		quizId: this._id,
		problems,
	}
}

module.exports = mongoose.model('Quiz', QuizSchema);























//var Sequelize = require('sequelize');
// var sequelize = new Sequelize('postgres://quiz_user:pass@127.0.0.1:5432/quiz');
//sequelize
//  .authenticate()
//  .then(() => {
//    console.log('Connection has been established successfully.');
//  })
//  .catch(err => {
//    console.error('Unable to connect to the database:', err);
//  });

