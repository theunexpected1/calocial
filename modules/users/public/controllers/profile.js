// Profile Controller

angular.module('calocial.users')
	.controller('ProfileController', [
		'$rootScope',
		'$scope',
		'$resource', 
		'$stateParams',
		function($rootScope, $scope, $resource, $stateParams){
			console.log($stateParams.userId);
		}]);