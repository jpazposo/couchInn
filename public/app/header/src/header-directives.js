"use strict";
angular.module('header').directive(
  'couchinnHeader',
  [
    '$location',
    'couchinnService',
    'headerService',
    function ($location,couchinnService,headerService) {
      return {
        restrict: 'E',
        replace: true,
        link: function ($scope) {

          $scope.logout = function () {
            couchinnService.logout()
            .then(function () {
              $location.path('/login');
            })
            .catch(function(){
              $location.path('/login');
            })
            ;
          };

          $scope.goto = function ( path ) {
            if (path === '/logout'){
              $scope.logout();
              return;
            }
            $location.path( path );
          };


          if (!$scope.buttons) $scope.buttons = headerService.getButtons();

        },
        transclude: false,
        scope: {
          buttons: '='
        },
        templateUrl: 'app/header/src/html/header.html'
      }
    }
  ]
);
