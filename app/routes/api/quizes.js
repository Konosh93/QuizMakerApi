var passport = require('passport');
var User = require('../../models/user.js');
var Quiz = require('../../models/quiz.js');
var router = require('express').Router();
var auth = require('./middleware/auth');

router.get('/', auth.required, getMyQuizes);
router.get('/', getAllQuizes)
router.post('/', auth.required, postQuiz);

function getAllQuizes(req, res){
	Quiz.find({}, (err, quizes) => {
		if (err) {
			throw err;
		}
		res.status(200).json(quizes);
	});
}

function getMyQuizes(req, res){
	console.log(req.user);
	res.json({message: 'Welcome to the quizes pagee'});
}

function postQuiz(req, res) {
	if (!req.body.quiz.title || typeof req.body.quiz.title !== 'string') {
		return res.status(422)
				  .json({errors: {title: 'Quiz must have a valid title'}});
	}
	if (!req.body.quiz.problems || !(req.body.quiz.problems instanceof Array)) {
		return res.status(422)
				  .json({errors: {problems: 'Quiz must have at least one valid problem'}});
	}
	Quiz.findOne({title: req.body.quiz.title, user: req.user.id}, function(err, quiz){
		if (err) {
			throw err;
		}
		if (!quiz) {
			var quiz = new Quiz(req.body.quiz);			
		}
		return quiz.save(function(err){
			if (err) {
				throw err;
			}
		})
		.then(() => res.status(200).json({message: 'success', quiz: quiz}));
	});
}

module.exports = router;