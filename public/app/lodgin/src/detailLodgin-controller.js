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
          $scope.pregunta = {};
          $scope.respuestas = [
            '', '', '' , '', '', '' , '' , '' , '' , '' , '' , '', '', '' , '' , '' , '' , '' , '' , ''
          ];

          couchinnService.getPreguntas($scope.lodgin)
            .then(function (preguntas) {
              $scope.preguntas = preguntas;
            });


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

            $scope.calcularPromedio = function (lista) {
             var resultado = 0;
             for (i in lista){
              resultado = resultado + i;
             }
             return resultado/lista.length;
            };


           $scope.preguntar = function (idx) {
             console.log('se va a realizar una pregunta:-----------');
             $scope.pregunta.nombre = $scope.lodgin.nombre;
             $scope.pregunta.username = $scope.user.username;
             console.log(JSON.stringify($scope.pregunta));
             couchinnService.preguntar($scope.pregunta)
               .then(function (pregunta) {
                 console.log('se pregunto correctamente : ----------------');
                 console.log(JSON.stringify(pregunta));
                 couchinnService.getPreguntas($scope.lodgin)
                   .then(function (preguntas) {
                     $scope.preguntas = preguntas;
                   });
                 $location.path('/detallar-publicacion');
                 $mdDialog.show(
                   $mdDialog.alert()
                     .parent(angular.element(document.querySelector('#popupContainer')))
                     .clickOutsideToClose(true)
                     .title('Preguntar sobre publicacion')
                     .textContent('La pregunta se realizo correctamente')
                     .ariaLabel('Alert Dialog Demo')
                     .ok('Ok')
                 );
               });
           };

           $scope.setPregunta = function (idx) {
              var preguntaContestar = $scope.preguntas[idx];
                  console.log('se va a setear la publicacion a modificar:-----------');
        console.log(JSON.stringify(preguntaContestar));
        couchinnService.setPregunta(preguntaContestar)
        .then(function (pregunta) {
                         console.log('se respondio correctamente : ----------------');
                         console.log(JSON.stringify(pregunta));
                         $location.path('/detallar-publicacion');
                         $mdDialog.show(
                           $mdDialog.alert()
                             .parent(angular.element(document.querySelector('#popupContainer')))
                             .clickOutsideToClose(true)
                             .title('Preguntar sobre publicacion')
                             .textContent('La pregunta se realizo correctamente')
                             .ariaLabel('Alert Dialog Demo')
                             .ok('Ok')
                         );
                       });
                   };



           $scope.responder = function (respuesta) {
             console.log('se va a responder una pregunta:-----------');
             $scope.pregunta = $scope.getPregunta;
             $scope.pregunta.respuesta = respuesta;
             console.log(JSON.stringify($scope.pregunta1));
             couchinnService.responder($scope.pregunta1)
               .then(function (pregunta) {
                 console.log('se respondio correctamente : ----------------');
                 console.log(JSON.stringify(pregunta));
                 $location.path('/detallar-publicacion');
                 $mdDialog.show(
                   $mdDialog.alert()
                     .parent(angular.element(document.querySelector('#popupContainer')))
                     .clickOutsideToClose(true)
                     .title('Preguntar sobre publicacion')
                     .textContent('La pregunta se realizo correctamente')
                     .ariaLabel('Alert Dialog Demo')
                     .ok('Ok')
                 );
               });
           };

            $scope.mandarRespuesta = function (pregunta, $index) {
              pregunta.respuesta = $scope.respuestas[$index];
              couchinnService.responder(pregunta)
                .then(function () {
                  console.log('se respondio correctamente : ----------------');
                  console.log(JSON.stringify(pregunta));
                  $location.path('/detallar-publicacion');
                  couchinnService.getPreguntas($scope.lodgin)
                    .then(function (preguntas) {
                      $scope.preguntas = preguntas;
                    });
                  $mdDialog.show(
                    $mdDialog.alert()
                      .parent(angular.element(document.querySelector('#popupContainer')))
                      .clickOutsideToClose(true)
                      .title('Preguntar sobre publicacion')
                      .textContent('La pregunta se realizo correctamente')
                      .ariaLabel('Alert Dialog Demo')
                      .ok('Ok')
                  );
                }).catch(function () {
                $mdDialog.show(
                  $mdDialog.alert()
                    .parent(angular.element(document.querySelector('#popupContainer')))
                    .clickOutsideToClose(true)
                    .title('Error al mandar respuesta')
                    .textContent('Error al mandar respuesta')
                    .ariaLabel('Alert Dialog Demo')
                    .ok('Reintentar')
                );
              })
            };




      $scope.damePreguntas= function () {
        console.log('se solicitan los tipos guardados:-----------');
        console.log(JSON.stringify($scope.preguntas));

        couchinnService.getPreguntas($scope.lodgin)
          .then(function (preguntas) {
            console.log('se obtuvieron los tipos: ----------------');
            console.log(JSON.stringify(preguntas));
            $scope.preguntas = preguntas;
            console.log($scope.preguntas);

          })
          .catch(function (error) {


                if (error.data.code == 11000) {
                  $mdDialog.show(
                    $mdDialog.alert()
                      .parent(angular.element(document.querySelector('#popupContainer')))
                      .clickOutsideToClose(true)
                      .title('Error al agregar tipo ')
                      .textContent('El nombre ya esta agregado: ')
                      .ariaLabel('Alert Dialog Demo')
                      .ok('Reintentar')

                  );
                }
                console.log(error);
              });
          }



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

            $scope.aceptar = function (application) {

              couchinnService.aceptarSolicitud(application)
                .then(function () {
                  $mdDialog.show(
                    $mdDialog.alert()
                      .parent(angular.element(document.querySelector('#popupContainer')))
                      .clickOutsideToClose(true)
                      .title('Acabas de Aceptar una solicitud')
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
                      .title('Hubo un error intentando aceptar esta solicitud')
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
