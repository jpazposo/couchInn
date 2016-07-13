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

              $scope.solicitar = function (nombre){

                if (!validateDates()) {
                  $mdDialog.show(
                    $mdDialog.alert()
                      .parent(angular.element(document.querySelector('#popupContainer')))
                      .clickOutsideToClose(true)
                      .title('Fecha No disponible ')
                      .textContent('Revise las fechas que tiene disponible')
                      .ariaLabel('Alert Dialog Demo')
                      .ok('Continuar')
                  );
                  return;
                }

                $scope.application.nombre = nombre;


                couchinnService.solicitar($scope.application)
                  .then()
                  .catch();

              };


              function validateDates(){

                var result = false;

                var selectedIni = new Date($scope.application.fechaInicio);
                var selectedFin = new Date($scope.application.fechaFin);

                var slectedRange = moment.range(selectedIni, selectedFin);

                $scope.lodgin.fechasReservadas
                .forEach(function(fechas){
                  var start = new Date(fechas.fechaInicio);
                  var end = new Date(fechas.fechaFin);

                  var unavailableRange = moment.range(start, end);

                  result = slectedRange.overlaps(unavailableRange);

                });




              };


          }
        }
    ]
);
