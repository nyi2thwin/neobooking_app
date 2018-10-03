'use strict';
module.exports = function(app){
	var clinicController = require('../controllers/ClinicController');
	
	app.route('/api/getAllclinics')
	.get(clinicController.listAllClinics);
	
	app.route('/api/findClinicById')
	.post(clinicController.findClinicById);

	app.route('/api/deleteClinicById')
	.post(clinicController.deleteClinic);

	app.route('/api/registerClinic')
	.post(clinicController.registerNewClinic);
	
	app.route('/api/updateClinic')
	.post(clinicController.editClinic);

	app.route('/api/getNearByClinic/:postalcode')
	.get(clinicController.listNearbyClinic);

	app.route('/api/addReview')
	.post(clinicController.addReview);

	app.route('/api/deleteReview/:reviewId')
	.post(clinicController.deleteReview);

	app.route('/api/editReview/:reviewId')
	.post(clinicController.editReview);
};
