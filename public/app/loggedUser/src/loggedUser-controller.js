"use strict";
angular.module('loggedUser').controller(
    'loggedUserController',
    [
        '$scope',
        'couchinnService',
        '$location',
        function ($scope, couchinnService, $location) {
          console.log('se cargó el controller loggedUserController');

          $scope.user = couchinnService.getUser();
          console.log($scope.user);

        }
    ]
);
