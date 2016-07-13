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
            couchinnService.logout()
            .then(function () {
              $location.path('/');
            })
            .catch(function(){
              $location.path('/login');
            })
            ;
          };

          $scope.go = function ( path ) {
            if (path === '/logout'){
              $scope.logout();
              return;
            }
            $location.path( path );
          };

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
