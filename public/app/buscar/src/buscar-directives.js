"use strict";
angular.module('buscar').directive(
  'publicacion',
  [
    function () {
      return {
        restrict: 'AE',
        replace: true,
        scope: {
          data: '='
        },
        link: function () {

        },
        transclude: false,
        templateUrl: 'app/buscar/src/html/publicacion.html'
      }
    }
  ]
);