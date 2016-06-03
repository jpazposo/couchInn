"use strict";
angular.module('login').controller(
    'loginController',
    [
        '$scope',
        'couchinnService',
        function ($scope, couchinnService) {
          console.log('se cargó el controller loginController');

          $scope.login = function () {
            couchinnService.login({
                username: $scope.username,
                password: $scope.password
            });
          };
        }
    ]
);
