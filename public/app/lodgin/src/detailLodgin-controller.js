"use strict";
angular.module('lodgin').controller(
    'detailLodginController',
    [
        '$scope',
        'couchinnService',
        '$location',

        function ($scope, couchinnService, $location) {

          console.log('se cargó el controller detailLodginController');
          $scope.lodgin = couchinnService.getLodgin();
          $scope.lodgin.fechaInicio = new Date($scope.lodgin.fechaInicio);
          $scope.lodgin.fechaFin = new Date($scope.lodgin.fechaFin);
          console.log(JSON.stringify($scope.lodgin));

          $scope.user = couchinnService.getUser();
          if (!$scope.user) {
            $scope.headerButtons = [
              {
                location: '/register',
                name: 'Registrarse'
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
          else {

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
          }
        }
    ]
);
