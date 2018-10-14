'use strict';
var mongoose = require('mongoose'),
	Booking = mongoose.model('Booking'),
	Clinic = mongoose.model('Clinic'),
	User = mongoose.model('User'),
	request = require('request');

exports.findBookingByClinicIdAndStatus = function(req,res){
	Booking.find({clinicId:req.body.clinicId, status:req.body.status}, function(err,bookings) {
		if(err)
			res.send(err);
		//res.json(booking);
		var results =[];
		var promises = [];
	    bookings.map(booking => {
        	promises.push(User.findOne({_id:booking.userId}).exec().then((user) => {
		    	var result = booking.toJSON();
				result['user'] = user.toJSON();
				results.push(result);
			}));
		});
		Promise.all(promises).then(function(result) {
			res.json(results);
		});
	});
};
exports.findBookingByClinicId = function(req,res){
	Booking.find({clinicId:req.body.clinicId}, function(err,bookings) {
		if(err)
			res.send(err);
		//res.json(booking);
		var results =[];
		var promises = [];
	    bookings.map(booking => {
        	promises.push(User.findOne({_id:booking.userId}).exec().then((user) => {
		    	var result = booking.toJSON();
				result['user'] = user.toJSON();
				results.push(result);
			}));
		});
		Promise.all(promises).then(function(result) {
			res.json(results);
		});
	});
};

exports.findBookingByUserIdAndStatus = function(req,res){
	Booking.find({userId:req.body.userId, status:req.body.status}, function(err,bookings) {
		if(err)
			res.send(err);
		
		var results =[];
		var promises = [];
	    bookings.map(booking => {
        	promises.push(Clinic.findOne({_id:booking.clinicId}).exec().then((clinic) => {
		    	var result = booking.toJSON();
				result['clinic'] = clinic.toJSON();
				results.push(result);
			}));
				
				
		});
		Promise.all(promises).then(function(result) {
			res.json(results);
		});
	});
};

exports.findBookingByUserId = function(req,res){
	Booking.find({userId:req.body.userId}, function(err,bookings) {
		if(err)
			res.send(err);
		
		var results =[];
		var promises = [];
	    bookings.map(booking => {
        	promises.push(Clinic.findOne({_id:booking.clinicId}).exec().then((clinic) => {
		    	var result = booking.toJSON();
				result['clinic'] = clinic.toJSON();
				results.push(result);
			}));
				
				
		});
		Promise.all(promises).then(function(result) {
			res.json(results);
		});
		
	});
};

exports.createNewBooking = function(req,res){
	var new_booking = new Booking(req.body);
	new_booking.save(function(err,booking) {
		if(err)
			res.send(err);
		res.json(booking);
	});
};


exports.deleteBooking = function(req, res) {
	Booking.remove({
	    _id: req.body.bookingId
	}, function(err, clinic) {
	    if (err)
	    	return res.send(err);
	    res.json({ message: 'Booking successfully removed' });
	});
};


exports.markVisited = function(req, res) {
	Booking.findOneAndUpdate({_id: req.body.bookingId}, {'status':'visited'}, function(err, booking) {
    	if (err)
			return res.send(err);
		res.json({ message: 'Booking mark visited successfully!' });
	});
};

exports.sendNotification = function(req, res) {
	//send whatapp or telegram msg code here
	Booking.findOne({_id:req.body.bookingId}, function(err,booking) {
		if(err)
			res.send(err);
		User.findOne({_id:booking.userId}, function(err,user) {
			if(err)
					res.send(err);
				var toContact = "+65"+user.contact;
				var username = "AC59e4977e40e9adf2ff7a51b597069587";
				var password = "5dd689bae791867c4f6c8c0e75ccb0d0";
				
				var bodymsg = "This is from neoBooking. Your queue number is in 5 min. Please proceed to clinic as soon as possible.";
				
				var options = {
							    url: 'https://api.twilio.com/2010-04-01/Accounts/AC59e4977e40e9adf2ff7a51b597069587/Messages.json',
							    method: 'POST',
							    auth: {
							        'user': username,
							        'pass': password
							    },
							    form: {
							        To: toContact,
							        From: '+17025087743',
							        Body: bodymsg
							    },
							    headers: {
							        'Accept': '*/*'
							    }
							};
				request(options,
				    function (error, response, body) {
				        if (!error && (response.statusCode == 200 || response.statusCode == 201)) {
				            console.log(body)
				            res.json({ message: 'Notification SMS successfully sent to '+toContact+"!" });
				        }
				        if(error)
							console.log(error)
							res.json({ error: error,response:response, message: 'Notification SMS failed sent to '+toContact+"!" });
				    }
				);
			});
	});
};

exports.sendReminder = function(req, res) {
	//send whatapp or telegram msg code here
	Booking.findOne({_id:req.body.bookingId}, function(err,booking) {
		if(err)
			res.send(err);
		User.findOne({_id:booking.userId}, function(err,user) {
			if(err)
					res.send(err);
				var toContact = "+65"+user.contact;
				var username = "AC59e4977e40e9adf2ff7a51b597069587";
				var password = "5dd689bae791867c4f6c8c0e75ccb0d0";
				
				var bodymsg = "This is a Reminder to take medicine A from Neobooking.";
				
				var options = {
							    url: 'https://api.twilio.com/2010-04-01/Accounts/AC59e4977e40e9adf2ff7a51b597069587/Messages.json',
							    method: 'POST',
							    auth: {
							        'user': username,
							        'pass': password
							    },
							    form: {
							        To: toContact,
							        From: '+17025087743',
							        Body: bodymsg
							    },
							    headers: {
							        'Accept': '*/*'
							    }
							};
				request(options,
				    function (error, response, body) {
				        if (!error && (response.statusCode == 200 || response.statusCode == 201)) {
				            console.log(body)
				            res.json({ message: 'Reminder SMS successfully sent to '+toContact+"!" });
				        }
				        if(error)
							console.log(error)
							res.json({ error: error,response:response, message: 'Reminder SMS failed sent to '+toContact+"!" });
				    }
				);
			});
	});
};