(function () {
    'use strict';

    angular
        .module('app')
        .controller('mainController', mainController);
	
	mainController.$inject = ['$scope','$rootScope'];
    function mainController($scope,$rootScope) {
	
		var init = function() {
			//$scope.map.setCenter(new google.maps.LatLng(response.data.lat,response.data.long));
			//$scope.map.setZoom(15);
		}
		
		/********************* Map Section ***********************************/
				
		var mapOptions = {
                  zoom: 13,
                  center: new google.maps.LatLng(1.290270,103.851959),
                  mapTypeId: google.maps.MapTypeId.TERRAIN,
                  styles: [{"featureType":"all","elementType":"geometry.fill","stylers":[{"weight":"2.00"}]},{"featureType":"all","elementType":"geometry.stroke","stylers":[{"color":"#9c9c9c"}]},{"featureType":"all","elementType":"labels.text","stylers":[{"visibility":"on"}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#f2f2f2"}]},{"featureType":"landscape","elementType":"geometry.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"landscape.man_made","elementType":"geometry.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":-100},{"lightness":45}]},{"featureType":"road","elementType":"geometry.fill","stylers":[{"color":"#eeeeee"}]},{"featureType":"road","elementType":"labels.text.fill","stylers":[{"color":"#7b7b7b"}]},{"featureType":"road","elementType":"labels.text.stroke","stylers":[{"color":"#ffffff"}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#46bcec"},{"visibility":"on"}]},{"featureType":"water","elementType":"geometry.fill","stylers":[{"color":"#c8d7d4"}]},{"featureType":"water","elementType":"labels.text.fill","stylers":[{"color":"#070707"}]},{"featureType":"water","elementType":"labels.text.stroke","stylers":[{"color":"#ffffff"}]}]
        }
		$scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);
		$scope.geoCoder = new google.maps.Geocoder();
	  
		var infoWindow = new google.maps.InfoWindow();
		$scope.openInfoWindow = function(e, selectedMarker){
			e.preventDefault();
			google.maps.event.trigger(selectedMarker, 'click');
		}
		
		var createMarker = function (clinic){
                  
			var marker = new google.maps.Marker({
				map: $scope.map,
				position: new google.maps.LatLng(clinic.location[0], clinic.location[1]),
				title:clinic.name
			});
			marker.content = '<div class="infoWindowContent">' + clinic.address + '</div>';
		  
			google.maps.event.addListener(marker, 'click', function(){
				infoWindow.setContent('<h4>' + marker.title + '</h4>' + marker.content);
				infoWindow.open($scope.map, marker);
			});
		  
			$scope.markers.push(marker);
                  
        }  

        
	
    }
    

})();

