"use strict";
angular.module('lodgin').controller(
    'lodginController',
    [
        '$scope',
        'couchinnService',
        '$location',
        '$mdDialog',

        function ($scope, couchinnService, $location, $mdDialog) {

          $scope.user = couchinnService.getUser();
          if (!$scope.user) $location.url('/login');
          console.log('se cargó el controller lodginController');
          $scope.lodgin = {}; // modelo a completarse con el formulario.
          $scope.lodgins = [];
          $scope.tiposHospedajes = [];
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


          couchinnService.obtenerTiposDeHospedaje()
            .then(function (hospedajes) {
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

                      $mdDialog.show(
                        $mdDialog.alert()
                          .parent(angular.element(document.querySelector('#popupContainer')))
                          .clickOutsideToClose(true)
                          .title('Error al publicar')
                          .textContent('datos duplicados o incorrectos')
                          .ariaLabel('Alert Dialog Demo')
                          .ok('Reintentar')
                      );

                      // code 11000 means lodgin already exist
                      console.log(error);
                    });
                };

                //Obtener Todos las publicaciones
                $scope.obtenerPublicaciones = function () {
                  console.log('se solicita las publicaciones guardadas:-----------');
                  console.log(JSON.stringify($scope.lodgins));

                  couchinnService.getLodginsByUser($scope.user)
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
