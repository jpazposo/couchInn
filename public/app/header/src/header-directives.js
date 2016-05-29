"use strict";
angular.module('header').directive(
  'couchinnHeader',
  [
    '$location',
    function ($location) {
      return {
        restrict: 'AE',
        replace: true,
        link: function ($scope) {

          $scope.go = function ( path ) {
            $location.path( path );
          };

        },
        transclude: false,
        templateUrl: 'app/header/src/html/header.html'
      }
    }
  ]
);
