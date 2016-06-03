"use strict";
angular.module('couchinn').controller(
    'couchInnController',
    [
        '$scope',
        function ($scope) {
          console.log('se cargó el controller couchInnController');

          $scope.headerButtons = [
            {
              location: '/register',
              name: 'Registrate'
            },
            {
              location: '/login',
              name: 'Iniciar Sesión'
            }
          ];
        }
    ]
);
