(function() {
	'use strict';

	angular.module('firealbumPost', [])
	  .config(function ($routeProvider) {
	    $routeProvider
	      .when('/post', {
	        templateUrl: 'app/post/post.html',
	        controller: 'PostCtrl'
	      });
	  });
})();
