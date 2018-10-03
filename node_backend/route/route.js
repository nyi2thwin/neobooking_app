'use strict';
module.exports = function(app){
	var accountController = require('../controllers/AccountController');
	var bookingController = require('../controllers/BookingController');
	app.route('/api/getAllusers')
	.get(accountController.list_all_users);
	
	app.route('/api/register')
	.post(accountController.registerNewUser);
	
	app.route('/api/findUserById')
	.post(accountController.findUserById);
	
	app.route('/api/findUserByNric')
	.post(accountController.findUserByNric);
		
	app.route('/api/updateUser')
	.post(accountController.update_userinfo);
	
	app.route('/api/createBooking')
	.post(bookingController.createNewBooking);
	
	app.route('/api/findBookingByUserIdAndStatus')
	.post(bookingController.findBookingByUserIdAndStatus);
	
	app.route('/api/findBookingByClinicId')
	.post(bookingController.findBookingByClinicId);
	
	app.route('/api/findBookingByClinicIdAndStatus')
	.post(bookingController.findBookingByClinicIdAndStatus);
	
	app.route('/api/findBookingByUserId')
	.post(bookingController.findBookingByUserId);
	
	app.route('/api/deleteBooking')
	.post(bookingController.deleteBooking);

	app.route('/api/sendNotification')
	.post(bookingController.sendNotification);

	app.route('/api/markVisited')
	.post(bookingController.markVisited);

	app.route('/api/resetPasswordByID')
	.post(accountController.resetPasswordByID);

	app.route('/api/resetPasswordByEmail')
	.post(accountController.resetPasswordByEmail);
	
};
