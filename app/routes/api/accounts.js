var passport = require('passport');
var User = require('../../models/user.js')
var router = require('express').Router();
var auth = require('./middleware/auth');



router.post('/signup', signup);
router.post('/login', login);
router.get('/logout', auth.required, logout);
router.get('/profile', auth.required, profile);

function signup(req,res,next){
	if (!req.body.user.name) {
		return res.status(422).json({errors: {name: 'Name field is required'}})
	}
	if (!req.body.user.email) {
		return res.status(422).json({errors: {email: 'Email field is required'}})
	}
	if (!req.body.user.password) {
		return res.status(422).json({errors: {password: 'Password filed is required'}})
	}
	passport.authenticate('local-signup', {session: false} , function(err, user, info){
		if (err) {return next(err);}
		if (!user) {
			return res.status(422).json({errors: {email: 'This email already exists'}});
		}else{
			res.status(200).json({user: user.toAuthJSON()});
		}
	})(req,res,next)
}

function login(req,res,next){
	if (!req.body.user.email) {
		return res.status(422).json({errors: {email: 'Email is required'}})
	}
	if (!req.body.user.password) {
		return res.status(422).json({errors: {password: 'Password is required'}})
	}
	passport.authenticate('local-login', {session: false} , function(err, user, info){
		if (err) {return next(err);}
		if (!user) {
			return res.status(422).json(info);
		}else{
			res.json({user: user.toAuthJSON()})
		}
	})(req,res,next)
}

function logout(req, res){
	res.json('get-logout');
}

function profile(req, res){
	res.json({message: 'restricted area', name: req.payload.username});
}

module.exports = router;