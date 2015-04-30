// Users Module

angular.module('calocial.users')
	.controller('UserController', [
		'$rootScope',
		'$scope',
		'$resource', 
		'$location', 
		'$mdToast', 
		'storage',
		function($rootScope, $scope, $resource, $location, $mdToast, storage){
			$scope.user = {};
			$scope.create = function(){

				$resource('/auth/').save($scope.user, function(res){
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
				$resource('/auth/login').save($scope.user, function(res){
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
				$resource('/auth/logout').save(function(res){
					if(res.status){
						storage.remove('user');
						$rootScope.$broadcast('loggedOut');
					}
				});
			}
			
			$scope.resetForm = function(){
				$scope.user = {};
				$scope.userForm.$setPristine();
				$scope.userForm.$setUntouched();
			}
		}]);