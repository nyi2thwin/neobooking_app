'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
	nric: {
		type:String,
		index: {unique: true}
	},
	email: {
		type:String,
		index: {unique: true}
	},
	name: {
		type:String
	},
	contact: {
		type:Number,
		required: 'Kindly enter contact no.',
		index: {unique: true}
	},
	dob: {
		type:Date
	},
	password: {
		type:String
	}
});

module.exports = mongoose.model('User', UserSchema);
