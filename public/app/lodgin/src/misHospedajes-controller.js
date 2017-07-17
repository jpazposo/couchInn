/**
 * Created by luciano on 15/07/16.
 */
"use strict";
angular.module('lodgin').controller(
  'misHospedajesController',
  [
    '$scope',
    'couchinnService',
    '$location',
    '$mdDialog',

    function ($scope, couchinnService, $location, $mdDialog) {


      $scope.user = couchinnService.getUser();
      if (!$scope.user) $location.url('/login');
      $scope.headerButtons = [
        {
          location: '/listadoTipoHospedaje',
          name: 'Listar Tipos de Hospedaje',
          rol: 'admin'
        },
        {
          location: '/nuevoTipoHospedaje',
          name: 'Agregar Tipo de Hospedaje',
          rol: 'admin'
        },
        {
          location: '/',
          name: 'Buscar'
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
          name: 'Agregar Publicaciones',
          rol: 'user'
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
        }
      ].filter(function (button) {
        if ($scope.user.role == 'admin') return true;
        return button.rol == $scope.user.role;
      });

      couchinnService.getMisHospedajes($scope.user)
        .then(function (lodgins) {
          $scope.lodgins = lodgins;
        });

      $scope.detalle = function (idx) {
        var lodgin_to_show = $scope.lodgins[idx];
        console.log('se va a setear la publicacion que se va a mostrat:-----------');
        console.log(JSON.stringify(lodgin_to_show));
        couchinnService.setLodgin(lodgin_to_show)
        $location.path('/detallar-publicacion');

      };

    }
  ]
);
