(function () {
    'use strict';

    angular
        .module('app', ['ngRoute', 'ngCookies','ngMaterial','jkAngularRatingStars'])
        .config(config)
        .run(run);

    config.$inject = ['$routeProvider', '$locationProvider'];
    function config($routeProvider, $locationProvider) {
        $routeProvider
			.when('/admin', {
                controller: 'AdminController',
                templateUrl: 'clinic-views/admin.view.html',
                controllerAs: 'vm'
            })
            .when('/listPatient', {
                controller: 'patientListController',
                templateUrl: 'clinic-views/patientList.html',
                controllerAs: 'vm'
            })
            .when('/viewMyClinicInfo', {
                controller: 'viewMyClinicInfoController',
                templateUrl: 'clinic-views/viewMyClinicInfo.html',
                controllerAs: 'vm'
            })
            .when('/viewMyClinicReviews', {
                controller: 'viewMyClinicReviewsController',
                templateUrl: 'clinic-views/viewMyClinicReviews.html',
                controllerAs: 'vm'
            })
            .when('/login', {
                controller: 'LoginController',
                templateUrl: 'member-views/login.view.html',
                controllerAs: 'vm'
            })
            .when('/register', {
                controller: 'RegisterController',
                templateUrl: 'member-views/register.view.html',
                controllerAs: 'vm'
            })

            .when('/recover', {
                controller: 'RecoverPasswordController',
                templateUrl: 'member-views/recover.view.html',
                controllerAs: 'vm'
            })

            .when('/home', {
                controller: 'homeController',
                templateUrl: 'member-views/home.html',
                controllerAs: 'vm'
            })
            .when('/main', {
                controller: 'mainController',
                templateUrl: 'member-views/main.html',
                controllerAs: 'vm'
            })
            .when('/viewMyInfo', {
                controller: 'viewMyInfoController',
                templateUrl: 'member-views/viewMyInfo.html',
                controllerAs: 'vm'
            })
            .when('/viewHistory', {
                controller: 'viewAppointmentHistoryController',
                templateUrl: 'member-views/viewAppointmentHistory.html',
                controllerAs: 'vm'
            })
            .when('/bpmCalculator', {
                controller: 'bpmCalculatorController',
                templateUrl: 'member-views/bpmCalculator.html',
                controllerAs: 'vm'
            })
            .when('/stepsTracker', {
                controller: 'stepsTrackerController',
                templateUrl: 'member-views/stepsTracker.html',
                controllerAs: 'vm'
            })

            .otherwise({ redirectTo: '/login' });
    }

    run.$inject = ['$rootScope', '$location', '$cookies', '$http'];
    function run($rootScope, $location, $cookies, $http) {
        $rootScope.loggedIn = false;
        $rootScope.isClinic = false;
        $rootScope.isGuest = false;
        
        // keep user logged in after page refresh
        $rootScope.globals = $cookies.getObject('globals') || {};
    
        if ($rootScope.globals.currentUser) {
            $rootScope.loggedIn = true;
            $rootScope.isClinic = $rootScope.globals.currentUser.isClinic;
            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata;
        }

        var init = function(){

        };

        $rootScope.sidebarCollapse = function() {
            $('#sidebar, #content').toggleClass('active');
            $('.collapse.in').toggleClass('in');
            $('a[aria-expanded=true]').attr('aria-expanded', 'false');
        }

        $rootScope.sidebarHide = function() {
            $('#sidebar').addClass('active');
            $('#content').addClass('active');
            //$('.collapse.in').toggleClass('in');
            //$('a[aria-expanded=true]').attr('aria-expanded', 'false');
        }

        $rootScope.sidebarShow = function() {
            $('#sidebar').removeClass('active');
            $('#content').removeClass('active');
            //$('.collapse.in').toggleClass('in');
            //$('a[aria-expanded=true]').attr('aria-expanded', 'false');
        }

        $rootScope.logout = function(){

            $rootScope.globals = {};
            $rootScope.userName = "";
            $cookies.remove('globals');
            $http.defaults.headers.common.Authorization = 'Basic';
            $rootScope.isClinic = false;
            $rootScope.isGuest = false;
            $rootScope.loggedIn = false;

        }
        init();

        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            // redirect to login page if not logged in and trying to access a restricted page
            var restrictedPage = $.inArray($location.path(), ['/login', '/register','/home','/admin','/recover','/main']) === -1;
            var loggedIn = $rootScope.globals.currentUser;
            $rootScope.currentPath = $location.path();

                        if (loggedIn){
				$rootScope.userName = loggedIn.name;
			}
            if (restrictedPage && !loggedIn) {
                $location.path('/login');
                $rootScope.isClinic = false;
                $rootScope.isGuest = false;
            }
            else if (!restrictedPage && loggedIn) {
                $rootScope.loggedIn = true;
                isClinicAdmin();
            }
            

                        
        });

        
        
        $rootScope.$on('$locationChangeSuccess', function (event, next, current) { 
            if(isMobile()){
                $rootScope.sidebarCollapse();
            }
        });
        
        var isClinicAdmin = function(){
            if ($rootScope.isClinic){
                $location.path('/listPatient');
            }
            else{
                $location.path('/home');
            }
        }

        function isMobile() {
            var check = false;
            (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
            return check;
        };

    }

})();
