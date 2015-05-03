// Posts Search service

angular.module('calocial.posts')
	.service('postsSearch', [
		'$resource', 
		'$q', 
		function($resource, $q){
			var service = {};

			/**
			 * Search method to find posts that match provided keyword
			 * @param  {String} keyword keyword to search for
			 * @return {null}
			 */
			service.searchByKeyword = function(keyword){
				return $q(function(resolve, reject){
					console.log('attempting to search');
					$resource('/meetings/search/:keyword', {keyword: keyword})
						.get(function(res){
							resolve(res);
						});
				});
			};
			return service;
		}
	]);