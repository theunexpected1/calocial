// Users route
angular.module('calocial.users', ['ui.router'])
	.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider){
		
		$urlRouterProvider.otherwise('/');

		$stateProvider
			.state('/', {
				url: '/',
				templateUrl: '/views/home.html'
			})
			.state('auth/register', {
				url: '/auth/register',
				templateUrl: '/modules/users/public/views/register.html'
			})
			.state('auth/login', {
				url: '/auth/login',
				templateUrl: '/modules/users/public/views/login.html'
			})
	}]);