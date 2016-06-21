"use strict";
angular.module('buscar').controller(
    'buscarController',
    [
        '$scope',
        function ($scope) {
          console.log('se cargó el controller buscarController');

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
