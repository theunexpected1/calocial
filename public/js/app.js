// Angular App
	angular.module('app', ['ngMaterial', 'ngResource', 'calocial.users'])
		.config(['$mdThemingProvider', function($mdThemingProvider) {
			$mdThemingProvider.theme('default')
				.primaryPalette('cyan', {
					'default': '500',
					'hue-1': '100',
					'hue-2': '500',
					'hue-3': '700'
				})
				.accentPalette('yellow', {
					'default': 'A200',
					'hue-1': 'A100',
					'hue-2': 'A400'
				});
		}])
		.controller("appController", [
			'$scope', 
			'$location', 
			function($scope, $location){
			// Temporary setup
			$scope.isGuest = true;
			$scope.$on('loggedIn', function() {
				$scope.isGuest = false;
				$location.path('/');
			});

		}]);