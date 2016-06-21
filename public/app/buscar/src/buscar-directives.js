"use strict";
angular.module('buscar').directive(
  'someDirective',
  [
    function () {
      return {
        restrict: 'AE',
        replace: true,
        scope: {

        },
        link: function () {

        },
        transclude: false,
        templateUrl: 'app/couchInn/src/html/some.html'
      }
    }
  ]
);
