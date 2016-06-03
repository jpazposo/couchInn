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


          $scope.headerButtons = [
            {
              location: '/nuevoTipoHospedaje',
              name: 'Nuevo Tipo de Hospedaje'
            },
            {
              location: '/listadoTipoHospedaje',
              name: 'Listar Tipos de Hospedaje'
            },
            {
              location: '/logout',
              name: 'Cerrar Sesión'
            }
          ];

        }
    ]
);