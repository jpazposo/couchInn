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
              location: '/actualizar-perfil',
              name: 'Modificar mis datos'
            },
            {
              location: '/logout',
              name: 'Cerrar Sesión'
            },
            {
              location: '/myDonations',
              name: 'Mis Donaciones'
            },
            {
              location: '/donate',
              name: 'Donar'
            },
            {
              location: '/myLodgins',
              name: 'Mis Publicaciones'
            },
            {
              location: '/addLodgin',
              name: 'Crear Publicacion'
            }

          ];

        }
    ]
);
