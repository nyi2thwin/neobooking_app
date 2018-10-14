'use strict';
var mongoose = require('mongoose'),
	User = mongoose.model('User'),
	request = require('request');;

var nodemailer = require('nodemailer');





exports.findUserById = function(req,res){
	User.findOne({_id:req.body.userId}, function(err,user) {
		if(err)
			res.send(err);
		res.json(user);
	});
};

exports.findUserByContactNo = function(req,res){
	User.findOne({contact:req.body.contact}, function(err,user) {
		if(err)
			res.send(err);
		res.json(user);
	});
};

exports.findUserByNric = function(req,res){
	User.findOne({nric:req.body.nric}, function(err,user) {
		if(err)
			res.send(err);
		res.json(user);
	});
};

exports.registerNewUser = function(req,res){
	var new_user = new User(req.body);
	new_user.save(function(err,user) {
		if(err)
			res.send(err);
		res.json(user);
	});
};

exports.list_all_users = function(req, res) {
  User.find({}, function(err, user) {
    if (err)
      res.send(err);
    res.json(user);
  });
};

exports.update_userinfo = function(req, res) {
  User.findOneAndUpdate({_id: req.body._id}, req.body, {new: true}, function(err, user) {
    if (err)
      res.send(err);
    res.json(user);
  });
};


exports.remove_user = function(req, res) {
  User.remove({
    _id: req.params.userId
  }, function(err, user) {
    if (err)
      res.send(err);
    res.json({ message: 'User successfully removed' });
  });
};

exports.resetPasswordByID = function(req,res){
	var new_password = makeid();
	User.findOneAndUpdate({_id:req.body.userId},{password:new_password}, function(err,user) {
		if(err)
			res.send(err);
		if(user){
			send_email(new_password,user.email,user.nric);
			res.json(user);
		}else{
			res.json({})
		}
	});
};

exports.resetPasswordByEmail = function(req,res){
	var new_password = makeid();
	User.findOneAndUpdate({email:req.body.email},{password:new_password}, function(err,user) {
		if(err)
			res.send(err);
		if(user){
			send_email(new_password,user.email,user.nric);
			res.json(user);
		}else{
			res.json({})
		}
		
	});
};

exports.sendVerification = function(req, res) {
	//send whatapp or telegram msg code here
	User.findOne({contact:req.params.contact}, function(err,user) {
		if(err)
			res.send(err);
		var toContact = "+65"+user.contact;
		var username = "AC59e4977e40e9adf2ff7a51b597069587";
		var password = "5dd689bae791867c4f6c8c0e75ccb0d0";
		
		var bodymsg = "This is from neoBooking. Your Verification code is 8989.";
		
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
		            res.json({ message: 'Verification SMS successfully sent to '+toContact+"!" });
		        }
		        if(error)
					console.log(error)
					res.json({ error: error,response:response, message: 'Verification SMS failed sent to '+toContact+"!" });
		    }
		);
		
	});
};
//reset password related stuff below
//use your own gmail account.
var transporter = nodemailer.createTransport({
	  service: 'gmail',
	  auth: {
	    user: 'n2ttesttest@gmail.com',
	    pass: 'Password123$'
	  }
	});

function makeid() {
	var text = "";
	var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

	for (var i = 0; i < 10; i++)
	text += possible.charAt(Math.floor(Math.random() * possible.length));

	return text;
}

function send_email(password,recipient,nric){

	var mailOptions = {
	  from: 'no-reply@gmail.com',
	  to: recipient,
	  subject: 'Sending Email using Node.js',
	  html: 'Dear Neobooking User ,<br><br>This is your new password: '+password+'<br>NRIC: '+nric+' <br><br><br>Neobooking Team'
	};

	transporter.sendMail(mailOptions, function(error, info){
	  if (error) {
	    console.log(error);
	  } else {
	    console.log('Email sent: ' + info.response);
	  }
	});
}


