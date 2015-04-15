(function () {
  'use strict';

  angular
    .module('firealbumCollection')
    .factory('CollectionService', ['$firebaseArray', function ($firebaseArray) {

    var ref = new Firebase('https://mrandmrscoletta.firebaseio.com/photos');
    var collection = $firebaseArray(ref);

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
      getCollection: getCollection
    };

  }]);

})();
