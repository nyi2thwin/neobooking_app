(function () {
    'use strict';

    angular
        .module('app')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$location','FlashService','$rootScope','AuthenticationService','User','$scope'];
    function LoginController($location,FlashService,$rootScope,AuthenticationService,User,$scope) {
		

        var vm = this;
	    vm.login = login;
        vm.verifyContact = verifyContact;
        vm.contact = $location.search().contact;
        $scope.sentVerificationCode = false;
        $scope.message = "";

        (function initController() {
            // reset login status
			$rootScope.isClinic = false;
			$rootScope.isGuest = false;
            AuthenticationService.ClearCredentials();
            $rootScope.sidebarHide();
        })();
		
        function login() {
            vm.dataLoading = true;
			if(vm.verificationCode != "8989"){
                FlashService.Error("Invalid Verification Code!");
                $scope.sentVerificationCode = false;
                vm.dataLoading = false;
            }
            else{

    			AuthenticationService.Login(vm.contact, function (response) {
                    if (response.success) {
                        AuthenticationService.SetCredentials(vm.contact,response.data,false);
    					$rootScope.loggedIn = true;
                        $location.path('/home');
                    } else {
                        User.Create({contact:vm.contact})
                            .then(function (response) {
                                console.log(response);
                                if (response !== null && response._id) {
                                    AuthenticationService.SetCredentials(vm.contact,response,false);
                                    $rootScope.loggedIn = true;
                                    $location.path('/home');
                                } else {
                                    FlashService.Error("Something went wrong!");
                                    vm.dataLoading = false;
                                }
                        });
                        
                    }
                }); 
            }
        }

        function verifyContact() {
            vm.dataLoading = false;

            if(vm.contact == undefined){
                FlashService.Error("Please enter contact number!");
                $scope.sentVerificationCode = false;
                vm.dataLoading = false;
            }
            else{

                AuthenticationService.VerifyContact(vm.contact)
                    .then(function (response) {
                        if (response.message !== null) {
                                
                            $scope.sentVerificationCode = true;
                            FlashService.Success(response.message,false);
                            
                        } else {
                            $scope.sentVerificationCode = false;
                            FlashService.Error(response.message);
                            
                        }
                        vm.dataLoading = false;
                        
                });
            }

        }
	
    }

})();
