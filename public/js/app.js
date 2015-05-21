// Angular App

	angular.module('app', ['ngMaterial', 'ngResource', 'calocial.helpers', 'calocial.users', 'calocial.posts'])
		.config([
			'$mdThemingProvider',
			'$stateProvider', 
			'$urlRouterProvider',
			function($mdThemingProvider, $stateProvider, $urlRouterProvider) {

				// Theming
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


				// Routing
				// For any unmatched url, redirect to /
				$urlRouterProvider.otherwise('/');
				$stateProvider
					.state('/', {
						url: '/',
						templateUrl: '/views/home.html'
					});

			}
		])
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

				$scope.$on('userUpdated', function(event, user){
					$scope.user = user;
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