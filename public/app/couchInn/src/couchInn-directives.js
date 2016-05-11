'use strict';
angular.module('couchInn').directive(
  'mainView',
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
        templateUrl: 'app/couchInn/src/html/couchinn.html'
      }
    }
  ]
)
