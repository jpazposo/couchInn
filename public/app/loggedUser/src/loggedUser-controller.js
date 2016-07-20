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

      if (!$scope.user) $location.url('/login');



      $scope.headerButtons = [
        {
          location: '/nuevoTipoHospedaje',
          name: 'Nuevo Tipo de Hospedaje',
          rol: 'admin'
        },
        {
          location: '/listadoTipoHospedaje',
          name: 'Listar Tipos de Hospedaje',
          rol: 'admin'
        },
        {
          location: '/actualizar-perfil',
          name: 'Modificar mis datos',
          rol: 'user'
        },
        {
          location: '/logout',
          name: 'Cerrar Sesión',
          rol: 'user'
        },
        {
          location: '/myDonations',
          name: 'Mis Donaciones',
          rol: 'user'
        },
        {
          location: '/donate',
          name: 'Donar',
          rol: 'user'

        },
        {
          location: '/myLodgins',
          name: 'Mis Publicaciones',
          rol: 'user'
        },
        {
          location: '/addLodgin',
          name: 'Crear Publicacion',
          rol: 'user'
        },
        {
          location: '/mis-solicitudes',
          name: 'ver mis solicitudes',
          rol: 'user'
        }

      ].filter(function (button) {
        if ($scope.user.role == 'admin') return true;
        return button.rol == $scope.user.role;
      });

    }
  ]
);
