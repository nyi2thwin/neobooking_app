(function () {
    'use strict';

    angular
        .module('app')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$location','FlashService','$rootScope','AuthenticationService','User'];
    function LoginController($location,FlashService,$rootScope,AuthenticationService,User) {
		

        var vm = this;
	    vm.login = login;
        vm.contact = $location.search().contact;

        (function initController() {
            // reset login status
			$rootScope.isClinic = false;
			$rootScope.isGuest = false;
            AuthenticationService.ClearCredentials();
            $rootScope.sidebarHide();
        })();
		
        function login() {
            vm.dataLoading = true;
			
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

})();
