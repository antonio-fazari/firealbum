(function() {
	'use strict';

	angular.module('firealbumCollection', ['firebase'])
	  .config(function ($routeProvider) {
	    $routeProvider
	      .when('/collection', {
	        templateUrl: 'app/collection/collection.html',
	        controller: 'CollectionCtrl'
	      });
	  });

})();
