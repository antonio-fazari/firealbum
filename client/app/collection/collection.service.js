(function () {
  'use strict';

  angular
    .module('firealbumCollection')
    .factory('CollectionService', ['$firebaseArray', CollectionService]);

  function CollectionService($firebaseArray) {
    var ref = new Firebase("https://mrandmrscoletta.firebaseio.com/photos");
    var collection = $firebaseArray(ref);

    function Collection() {
      this.photos = collection;
    }

    function newCollection() {
      var collection = new Collection();

      return collection;
    }

    function addPhoto(photo) {
      // TODO - add photo function.
    }

    function getCollection() {
      return collection;
    }

    return {
      Collection: Collection,
      newCollection: newCollection,
      addPhoto: addPhoto,
      getCollection: getCollection
    };

  }

})();
