"use strict";
angular.module('header').directive(
  'couchinnHeader',
  [
    '$location',
    'couchinnService',
    function ($location,couchinnService) {
      return {
        restrict: 'E',
        replace: true,
        link: function ($scope) {

          $scope.logout = function () {
            couchinnService.logout().then(function () {
            });
          };

          $scope.go = function ( path ) {
            $location.path( path );
          };

        },
        transclude: false,
        scope: {
          botones: '='
        },
        templateUrl: 'app/header/src/html/header.html'
      }
    }
  ]
);
