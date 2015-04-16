'use strict';

angular.module('firealbumApp')
	.controller('MainCtrl', ['$scope', '$location', 'CollectionService',
		function ($scope, $location, CollectionService) {
			$scope.pageClass = 'page--main';
			$scope.hasLoaded = false;

			$scope.$on('collectionLoaded', function(event, hasLoaded) {
		    if (hasLoaded) {
		    	$scope.hasLoaded = hasLoaded;
		    	// Redirect to the collection page.
		    	$location.path('/collection');
		    }
			});

		}]);
