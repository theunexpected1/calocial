// Users Controller

angular.module('calocial.users')
	.controller('UserController', [
		'$rootScope',
		'$scope',
		'users', 
		'$location', 
		'$mdToast', 
		'storage',
		function($rootScope, $scope, users, $location, $mdToast, storage){
			$scope.userModel = {};
			$scope.create = function(){
				var user = new users.single($scope.userModel);
				user.$save(function(res){
					if(res.status){
						// toDo: Improvise toasts as system helpers
						$mdToast.show({
							template: '<md-toast><span flex>User created!</span></md-toast>',
							hideDelay: 2000
						});
						$scope.resetForm();
					} else{
						$mdToast.show({
							template: '<md-toast><span flex>' + res.message + '</span></md-toast>',
							hideDelay: 2000
						});
					}
				});
			};

			$scope.login = function(){
				var user = new users.login($scope.userModel);
				user.$save(function(res){
					if(res.status){
						storage.set('user', angular.toJson(res.json));
						$rootScope.$broadcast('loggedIn');
					} else{
						$mdToast.show({
							template: '<md-toast><span flex>Login failed!</span></md-toast>',
							hideDelay: 2000
						})
					}
				});
			}
			

			$scope.logout = function(){
				var user = new users.logout();
				user.$save(function(res){
					if(res.status){
						storage.remove('user');
						$rootScope.$broadcast('loggedOut');
					}
				});
			}
			
			$scope.resetForm = function(){
				$scope.userModel = {};
				$scope.userForm.$setPristine();
				$scope.userForm.$setUntouched();
			}
		}]);