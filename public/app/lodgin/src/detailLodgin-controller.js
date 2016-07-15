"use strict";
angular.module('lodgin').controller(
    'detailLodginController',
    [
        '$scope',
        'couchinnService',
        '$location',
        '$mdDialog',
        function ($scope, couchinnService, $location, $mdDialog) {

          console.log('se cargó el controller detailLodginController');
          $scope.lodgin = couchinnService.getLodgin();
          $scope.lodgin.fechaInicio = new Date($scope.lodgin.fechaInicio);
          $scope.lodgin.fechaFin = new Date($scope.lodgin.fechaFin);

          console.log(JSON.stringify($scope.lodgin));
          $scope.user = couchinnService.getUser();

          if (!$scope.user || $scope.user.username != $scope.lodgin.user.username) {
            $scope.notMyCouch = true;
          }
          else {
            $scope.notMyCouch = false;
          }

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

            $scope.application = {
              fechaFin: new Date($scope.lodgin.fechaFin),
              fechaInicio: new Date($scope.lodgin.fechaInicio)
            };

            $scope.solicitar = function (nombre){

              if (!$scope.user) {
                $location.url('/#login');
                return;
              }

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
                .then((lodgin)=>{
                  $mdDialog.show(
                    $mdDialog.alert()
                      .parent(angular.element(document.querySelector('#popupContainer')))
                      .clickOutsideToClose(true)
                      .title('Felicitaciones, acabas de reservar este couch')
                      .textContent('Un email será enviado a ' + $scope.user.username + ' detallando todos los datos de la reserva')
                      .ariaLabel('Alert Dialog Demo')
                      .ok('Seguir buscando otros couch')
                  );
                  $location.path('/user-logged/' + $scope.user.nombre);
                })
                .catch((err)=>{
                  $mdDialog.show(
                    $mdDialog.alert()
                      .parent(angular.element(document.querySelector('#popupContainer')))
                      .clickOutsideToClose(true)
                      .title('Hubo un error intentando solicitar este couch')
                      .textContent('Un email será enviado a ' + $scope.user.username + ' detallando el error')
                      .ariaLabel('Alert Dialog Demo')
                      .ok('reintentar')
                  );
                });

            };

            $scope.rechazar = function (application) {

              couchinnService.rechazarSolicitud(application)
                .then(function () {
                  $mdDialog.show(
                    $mdDialog.alert()
                      .parent(angular.element(document.querySelector('#popupContainer')))
                      .clickOutsideToClose(true)
                      .title('Acabas de rechazar una solicitud')
                      .textContent('Un email será enviado a ' + $scope.user.username + ' detallando el procedimiento')
                      .ariaLabel('Alert Dialog Demo')
                      .ok('Continuar')
                  );
                  $location.path('/user-logged/' + $scope.user.nombre);
                })
                .catch(function () {
                  $mdDialog.show(
                    $mdDialog.alert()
                      .parent(angular.element(document.querySelector('#popupContainer')))
                      .clickOutsideToClose(true)
                      .title('Hubo un error intentando rechazar esta solicitud')
                      .textContent('Un email será enviado a ' + $scope.user.username + ' detallando el error')
                      .ariaLabel('Alert Dialog Demo')
                      .ok('reintentar')
                  );
                });

            };


              var validateDates = function (){
                /*
                * @return Boolean
                */
                var result = true;

                var slectedRange = moment.range($scope.application.fechaInicio, $scope.application.fechaFin);

                $scope.lodgin.fechasReservadas
                .forEach(function(fechas){
                  var start = new Date(fechas.fechaInicio);
                  var end = new Date(fechas.fechaFin);

                  var unavailableRange = moment.range(start, end);

                  if(slectedRange.overlaps(unavailableRange)){
                    result = false;
                  }

                });

                return result;



              };


          }
        }
    ]
);
