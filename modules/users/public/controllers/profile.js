// Profile Controller

angular.module('calocial.users')
	.controller('ProfileController', [
		'$rootScope',
		'$scope',
		'users', 
		'$timeout', 
		'$stateParams',
		'storage',
		function($rootScope, $scope, users, $timeout, $stateParams, storage){
			$scope.profile = $scope.editingProfile = {};
			$scope.isInvalidProfile = false;
			$scope.isEditingProfile = false;

			$scope.editProfile = function(){
				$scope.isEditingProfile = true;
				$scope.editingProfile = angular.copy($scope.profile);
			};
			$scope.cancelEditProfile = function(){
				$scope.isEditingProfile = false;
			};

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

			$scope.updateProfile = function(){
				$scope.profile.name = $scope.editingProfile.name;
				users.me.update(null, $scope.profile, function(res){
					if(res.status){
						$scope.cancelEditProfile();
						storage.set('user', angular.toJson($scope.profile));

						$scope.$emit('userUpdated', $scope.profile);

						// toDo: Need to update header
					} else{
						console.log('could not save the user');
					}
				});
			}
			$scope.getUser();
		}]);