var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');
var secret = require('../config').secret;


var userSchema = new mongoose.Schema({
	name: {type: String, required:[true, "can't be empty"]},
	email: {type: String, lowercase: true, unique: true, required:[true, "can't be blank"], match:[/\S+@\S+\.\S+/, 'invalid email'], index: true},
	hash: String,
	salt: String,
}, {timestamps: true});

userSchema.plugin(uniqueValidator, {message: 'is already taken'});

userSchema.methods.setPassword = function(password){
	this.salt = crypto.randomBytes(16).toString('hex');
	this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
}

userSchema.methods.validPassword = function(password){
	hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex')
	return hash === this.hash;
}
/* Original */
/*
userSchema.methods.generateJWT = function(){
	var today = new Date();
	var exp = new Date(today);
	exp.setDate(today.getDate() + 60)
	return jwt.sign({
		id: this._id,
		name: this.name,
		exp: parseInt(exp.getTime() / 1000)
	}, secret)
}
*/

/* 10 mins */
userSchema.methods.generateJWT = function(){
	return jwt.sign({
		id: this._id,
		name: this.name,
		exp: parseInt(Date.now()+600000)
	}, secret)
}

userSchema.methods.toAuthJSON = function (){
	return {
		name: this.name,
		token: this.generateJWT(),
	}
}

module.exports = mongoose.model('User', userSchema);