angular.module('calocial.users')
	.controller('UserController', ['$scope', '$resource', function($scope, $resource){
		// $scope.user = {};
		$scope.create = function(){
			console.log('user');
			console.log($scope.user);

			$resource('/auth/').save($scope.user, function(res){
				console.log(res);
				console.log('User submitted');
			}, function(err){
				// toDo: Yet to handle separation of succes vs. error requests
				// currently, even failure to register (user already exists) will be treated as succesful from the front end.
				console.log(err);
				console.log('Error');
			});
		};
	}]);