(function () {
  'use strict';

  angular
    .module('firealbumCollection')
    .factory('CollectionService', ['$rootScope', '$timeout', '$firebaseArray',
      function ($rootScope, $timeout, $firebaseArray) {
        var hasLoaded = false;
        var photosRef = new Firebase('https://mrandmrscoletta.firebaseio.com/photos');
        var query = photosRef.orderByChild('timestamp');
        var collection = $firebaseArray(query);

        collection.$loaded()
          .then(function() {
            hasLoaded = true;
            $timeout(function() {
              $rootScope.$broadcast('collectionLoaded', hasLoaded);
            });
          })
          .catch(function(error) {
            // TODO: Need to handle errors properly.
            console.log('Error:', error);
          });

        function Collection() {
          this.photos = collection;
        }

        function newCollection() {
          var collection = new Collection();

          return collection;
        }

        function getCollection() {
          return collection;
        }

        return {
          Collection: Collection,
          newCollection: newCollection,
          getCollection: getCollection,
          hasLoaded: hasLoaded
        };

      }]);

})();
