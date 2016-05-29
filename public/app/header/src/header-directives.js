"use strict";
angular.module('header').directive(
  'couchinnHeader',
  [
    function () {
      return {
        restrict: 'AE',
        replace: true,
        link: function () {

        },
        transclude: false,
        templateUrl: 'app/header/src/html/header.html'
      }
    }
  ]
);
