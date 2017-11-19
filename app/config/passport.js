var User = require('../models/user.js')
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

passport.use('local-signup', new LocalStrategy({
		usernameField: 'user[email]',
		passwordField: 'user[password]',
		passReqToCallback: true,
	},
	function(req, email, password, done){
		process.nextTick( function(){
			User.findOne({'email': email.toLowerCase()}, function(err, user) {
				if (err) {
					return done(err);
				}
				if (user || !req.body.user.name) {
					return done(null, false);
				}else{
					var user = new User({
						name: req.body.user.name,
						email:email,
					});
					user.setPassword(password);
					user.save(function(err, user){
						if (err) {
							return done(err);
						}
						return done(null, user);
					})
				}
			})				
		})
	}
));

passport.use('local-login', new LocalStrategy({
		usernameField: 'user[email]',
		passwordField: 'user[password]',
		passReqToCallback: true,
	},
	function(req, email, password, done){
		process.nextTick( function(){
			User.findOne({'email': email.toLowerCase()}, function(err, user){
				if (err) {
					return done(err);
				}
				if (!user) {
					return done(null, false);
				}
				if (!user.validPassword(password)) {
					return done(null, false);
				}
				return done(null, user);
			})				
		})
	}
));


module.exports = passport;