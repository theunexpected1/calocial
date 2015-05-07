// Profile Controller

angular.module('calocial.users')
	.controller('ProfileController', [
		'$rootScope',
		'$scope',
		'users', 
		'$timeout', 
		'$stateParams',
		function($rootScope, $scope, users, $timeout, $stateParams){
			$scope.profile = {};
			$scope.isInvalidProfile = false;
			$scope.getUser = function(){
				users.single.get({userId: $stateParams.userId}, function(res){
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