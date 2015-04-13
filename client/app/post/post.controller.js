(function() {
	'use strict';

	angular
		.module('firealbumPost')
	  .controller('PostCtrl', ['$scope', 'PhotoService', PostCtrl]);

	  function PostCtrl($scope, PhotoService) {
	    var post = this;

	    /**
	     * Initialise the post controller.
	     */
	    post.init = function() {
	    	$scope.pageClass = 'page--post';
	    }

	    /**
	     * Add photo to firebase.
	     */
	    $scope.addPhoto = function() {
	    	var photo = {
	    		data: 'test',
	    		caption: 'testing',
	    		timestamp: new Date().getTime()
	    	};

	    	$scope.photos.$add(photo);
	    }

	    post.init();

	  }
})()