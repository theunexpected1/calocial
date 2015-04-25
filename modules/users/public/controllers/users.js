angular.module('calocial.users')
	.controller('UserController', [
		'$scope', 
		'$resource', 
		'$mdToast', 
		function($scope, $resource, $mdToast){
			$scope.user = {};
			$scope.create = function(){
				console.log('user');
				console.log($scope.user);

				$resource('/auth/').save($scope.user, function(res){
					console.log(res);
					console.log('User submitted');

					// toDo: Improvise toasts as system helpers
					$mdToast.show({
						template: '<md-toast><span flex>User created!</span></md-toast>',
						hideDelay: 4000
					});
					$scope.resetForm();

				}, function(err){
					// toDo: Yet to handle separation of succes vs. error requests
					// currently, even failure to register (user already exists) will be treated as succesful from the front end.
					console.log(err);
					console.log('Error');
				});
			};

			$scope.resetForm = function(){
				$scope.user = {};
				$scope.userForm.$setPristine();
				$scope.userForm.$setUntouched();
			}
		}]);