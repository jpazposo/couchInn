"use strict";
angular.module('lodgin').controller(
    'lodginController',
    [
        '$scope',
        'couchinnService',
        '$location',
        '$mdDialog',

        function ($scope, couchinnService, $location, $mdDialog) {
          console.log('se cargó el controller lodginController');
          $scope.lodgin = {}; // modelo a completarse con el formulario.
          $scope.lodgins = [];
          $scope.tiposHospedajes = [];
          $scope.headerButtons = [
            {
              location: '/listadoTipoHospedaje',
              name: 'Listar Tipos de Hospedaje'
            },
            {
              location: '/nuevoTipoHospedaje',
              name: 'Agregar Tipo de Hospedaje'
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
              name: 'Agregar Publicaciones'
            },
            {
              location: '/actualizar-perfil',
              name: 'Modificar mis datos'
            },
            {
              location: '/logout',
              name: 'Cerrar Sesión'
            }
          ];


          couchinnService.obtenerTiposDeHospedaje(hospedajes)
            .then(function () {
              $scope.tiposHospedajes = hospedajes;
            });

          // guardar Lodgin
                $scope.guardarLodgin = function () {
                  console.log('se va a guardar el la publicacion:-----------');
                  console.log(JSON.stringify($scope.lodgin));

                  couchinnService.addLodgin($scope.lodgin)
                    .then(function (lodgin) {
                      console.log('se guardo correctamente : ----------------');
                      console.log(JSON.stringify(lodgin));
                      $location.path('/myLodgins');
                    })
                    .catch(function (error) {

                      // code 11000 means lodgin already exist
                      console.log(error);
                    });
                };

                //Obtener Todos las publicaciones
                $scope.obtenerPublicaciones = function () {
                  console.log('se solicita las publicaciones guardadas:-----------');
                  console.log(JSON.stringify($scope.lodgins));

                  couchinnService.getLodgins()
                    .then(function (lodgins) {
                      console.log('se obtuvieron las publicaciones: ----------------');
                      console.log(JSON.stringify(lodgins));
                      $scope.lodgins = lodgins;
                      console.log($scope.lodgins);

                    })
                    .catch(function (error) {

                      // code 11000 means lodgin already exist
                      console.log(error);
                    });
                };

              }
            ]
          );
