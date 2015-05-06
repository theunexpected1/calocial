// Profile Controller

angular.module('calocial.users')
	.controller('ProfileController', [
		'$rootScope',
		'$scope',
		'$resource', 
		'$timeout', 
		'$stateParams',
		function($rootScope, $scope, $resource, $timeout, $stateParams){
			$scope.profile = {};
			$scope.isInvalidProfile = false;
			$scope.getUser = function(){
				console.log('getting user');
				$resource('/auth/' + $stateParams.userId).get(function(res){
					if(res.status){
						$scope.profile = res.json;
						$scope.isInvalidProfile = false;
					} else{
						$scope.isInvalidProfile = true;
					}
				});
			};
			$scope.getUser();

		}]);