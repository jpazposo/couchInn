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
              location: '/',
              name: 'Buscar'
            },
            {
              location: '/quienes-somos',
              name: 'Acerca de'
            },
            {
              location: '/login',
              name: 'Iniciar Sesión'
            }
          ];
        }
    ]
);
