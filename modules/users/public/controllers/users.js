// Users Module

angular.module('calocial.users')
	.controller('UserController', [
		'$rootScope',
		'$scope',
		'$resource', 
		'$location', 
		'$mdToast', 
		function($rootScope, $scope, $resource, $location, $mdToast){
			$scope.user = {};
			$scope.create = function(){
				console.log($scope.user);

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
							template: '<md-toast><span flex>User already exists!!</span></md-toast>',
							hideDelay: 2000
						});
					}

				}, function(err){
					// toDo: Yet to handle separation of succes vs. error requests
					// currently, even failure to register (user already exists) will be treated as succesful from the front end.
					console.log(err);
				});
			};

			$scope.login = function(){
				$resource('/auth/login').save($scope.user, function(res){
					if(res.status){
						$rootScope.user = res.json;
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