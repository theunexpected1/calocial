// Angular App
	angular.module('app', ['ngMaterial', 'calocial.users'])
		.config(['$mdThemingProvider', function($mdThemingProvider) {
			$mdThemingProvider.theme('default')
				.primaryPalette('cyan', {
					'default': '500',
					'hue-1': '100',
					'hue-2': '500',
					'hue-3': '700'
				})
				.accentPalette('yellow', {
					'default': 'A200',
					'hue-1': 'A100',
					'hue-2': 'A400'
				});
		}])
		.controller("appController", function(){
		});