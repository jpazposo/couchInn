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
          $scope.lodgin = {
            fechaInicio: new Date(),
            fechaFin: new Date()
          }; // modelo a completarse con el formulario.
          $scope.today = new Date();
          $scope.lodgins = [];
          $scope.tiposHospedajes = [];
          $scope.user = couchinnService.getUser();
          $scope.selectedLodgin = {};
          $scope.selectedAnular = false;
          $scope.selectedHabilitar = false;
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

          $scope.selectLodgin = function(lodgin){

            if ($scope.selectedLodgin == lodgin){
              $scope.selectedLodgin = {};
              $scope.selectedAnular = false;
              $scope.selectedHabilitar = false;
            } else {
              $scope.selectedLodgin = lodgin;
              if (lodgin.activa == "SI"){
                $scope.selectedAnular = true;}
              else {
                $scope.selectedHabilitar = true;
              }
            }
          };

          $scope.anularPublicacion = function(){
            //anulamos la publicacion y mostramos mensaje
            $scope.selectedLodgin.activa = "NO";
            $scope.selectedAnular = false;
            $location.path('/anulacionLodgin');
            if ($scope.selectedLodgin.applicants > 0){
              // hay por lo menos 1 solicitante, debemos informar mediante mail
            }
          };

          $scope.habilitarPublicacion = function(){
            //anulamos la publicacion y mostramos mensaje
            $scope.selectedLodgin.activa = "SI";
            $scope.selectedHabilitar = false;
            if ($scope.selectedLodgin.applicants > 0){
              // hay por lo menos 1 solicitante, debemos informar mediante mail
            }
          };


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




              }
            ]
          );
