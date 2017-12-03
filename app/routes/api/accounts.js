var passport = require('passport');
var User = require('../../models/user.js')
var router = require('express').Router();
var auth = require('./middleware/auth');



router.post('/signup', signup, errHandler);
router.post('/login', login, errHandler);
router.get('/recall', auth.required, tokenExpiry, recall,errHandler);
router.get('/profile', auth.required, profile, errHandler);

function signup(req,res,next){
	if (!req.body.user.name) {
		return res.status(422).json({errors: {message: 'Name field is required'}})
	}
	if (!req.body.user.email) {
		return res.status(422).json({errors: {message: 'Email field is required'}})
	}
	if (!req.body.user.password) {
		return res.status(422).json({errors: {message: 'Password filed is required'}})
	}
	passport.authenticate('local-signup', {session: false} , function(err, user, info){
		if (err) {return next(err);}
		if (!user) {
			return res.status(422).json({errors: {message: 'This email already exists'}});
		}else{
			return res.status(201).json({user: user.toAuthJSON()});
		}
	})(req,res,next)
}

function login(req,res,next){
	if (!req.body.user.email) {
		return res.status(422).json({errors: {message: 'Email is required'}})
	}
	if (!req.body.user.password) {
		return res.status(422).json({errors: {message: 'Password is required'}})
	}
	passport.authenticate('local-login', {session: false} , function(err, user, info){
		if (err) {return next(err);}
		if (!user) {
			return res.status(422).json({errors: {message: 'Email or password is incorrect'}});
		}else{
			res.status(200).json({user: user.toAuthJSON()})
		}
	})(req,res,next)
}
function errHandler (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
  	return res.status(422).json({errors: {message: 'you are currently not logged in'}});
  };
  res.status(422).json({errors: { message: "Something went wrong"}})	
}

function recall(req, res, next){
  process.nextTick( function(){
    User.findOne({'_id': req.user.id}, (mongoErr, user) => {
    	if (mongoErr) next(err);
    	if (!user) {
    		return res.status(422).json({errors: {message: "you are currently not logged in"}});
    	}
    	return res.status(200).json({ user: user.toAuthJSON()})
    });
  });

}

function tokenExpiry(req, res, next){
	if (req.user && req.user.exp) {
	 	if (req.user.exp < Date.now()) {
	 		return res.status(422).json({errors: {message: "your credentials are invalid"}});
	 	}
	}
	next()
}

function profile(req, res){
	res.json({message: 'restricted area', name: req.payload.username});
}

module.exports = router;