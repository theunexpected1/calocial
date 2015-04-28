// Angular App

	angular.module('app', ['ngMaterial', 'ngResource', 'calocial.helpers', 'calocial.users'])
		.config(['$mdThemingProvider', function($mdThemingProvider) {
			$mdThemingProvider.theme('default')
				.primaryPalette('cyan', {
					'default': '500',
					'hue-1': '100',
					'hue-2': '500',
					'hue-3': '700'
				})
				.accentPalette('red', {
					'default': 'A200',
					'hue-1': 'A100',
					'hue-2': 'A400'
				});
		}])
		.controller("appController", [
			'$scope', 
			'$location', 
			'storage',
			function($scope, $location, storage){
				// Temporary setup
				$scope.isGuest = true;
				$scope.$on('loggedIn', function() {
					$scope.authenticate();
					$location.path('/');
				});

				$scope.$on('loggedOut', function() {
					$scope.authenticate();
					$location.path('/');
				});

				$scope.authenticate = function(){
					if(storage.get('user')){
						$scope.user = angular.fromJson(storage.get('user'));
						$scope.isGuest = false;
					} else{
						$scope.user = {};
						$scope.isGuest = true;
					}
				}

				// Initialize
				$scope.authenticate();
			}]);