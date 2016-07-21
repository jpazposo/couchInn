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
              location: '/',
              name: 'Buscar',
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

      $scope.modificar = function (idx) {
        var lodgin_to_modified = $scope.lodgins[idx];
        console.log('se va a setear la publicacion a modificar:-----------');
        console.log(JSON.stringify(lodgin_to_modified));
        couchinnService.setLodgin(lodgin_to_modified)
        $location.path('/actualizar-publicacion');

      };

      $scope.detalle = function (idx) {
        var lodgin_to_show = $scope.lodgins[idx];
        console.log('se va a setear la publicacion que se va a mostrat:-----------');
        console.log(JSON.stringify(lodgin_to_show));
        couchinnService.setLodgin(lodgin_to_show)
        $location.path('/detallar-publicacion');

      };

      $scope.anularPublicacion = function(idx){
        if ( $scope.lodgins[idx].applications.length > 0) {
          var cantAceptadas = 0;
          var cantRechazadas = 0;
          var cantPendientes = 0;
          var listaDeMails = " ";

          $scope.lodgins[idx].applications.forEach(function (appli){
          if (appli.status == "aceptada" ){
            cantAceptadas = cantAceptadas + 1;
          }else if (appli.status == "rechazada"){
            cantRechazadas = cantRechazadas + 1;
          }else if (appli.status == "pendiente"){
            cantPendientes = cantPendientes + 1;
          };
          //  listaDeMails = listaDeMails + appli.owner.email +" ";
          });
          var confirm = $mdDialog.confirm()
            .title('Existen Solicitudes realizadas sobre esta Publicacion!!')
            .textContent('la misma contiene ' +
              $scope.lodgins[idx].applications.length + ' Solicitudes: '+
              cantAceptadas + ' aceptada/s, '+ cantRechazadas + ' rechazada/s y '+cantPendientes+' pendiente/s.' +
          ' Si confirma todos las solicitudes seran anuladas y la Publicacion ya no aceptara solicitudes.')
            .ariaLabel('Lucky day')
            .ok('Confirmar')
            .cancel('Cancelar');
          $mdDialog.show(confirm).then(function() {
            $scope.lodgins[idx].activa = "NO";

            $scope.lodgins[idx].applications.forEach(function (appli){
              couchinnService.anularSolicitud(appli);
            });

            couchinnService.editLodgin($scope.lodgins[idx]).then(function () {
              $mdDialog.show(
                $mdDialog.alert()
                  .parent(angular.element(document.querySelector('#popupContainer')))
                  .clickOutsideToClose(true)
                  .title('La Publicacion ha sido Anulada!!')
                  .textContent('Se ha enviado notificacion por mail a los solicitantes: '+listaDeMails)
                  .ariaLabel('Alert Dialog Demo')
                  .ok('Continuar')
              );
            });
          });
        }else {
          var confirm = $mdDialog.confirm()
            .title('Esta por Anular una Publicacion!!')
            .textContent('Si confirma la misma ya no admitira solicitudes')
            .ariaLabel('Lucky day')
            .ok('Confirmar')
            .cancel('Cancelar');
          $mdDialog.show(confirm).then(function() {
            $scope.lodgins[idx].activa = "NO";
            couchinnService.editLodgin($scope.lodgins[idx]).then(function () {
              $mdDialog.show(
                $mdDialog.alert()
                  .parent(angular.element(document.querySelector('#popupContainer')))
                  .clickOutsideToClose(true)
                  .title('La Publicacion ha sido Anulada!!')
                  .textContent('Ya NO puede realizarse solicitudes sobre la misma ')
                  .ariaLabel('Alert Dialog Demo')
                  .ok('Continuar')
              );
            });
          });
        }};

      $scope.activarPublicacion = function(idx) {
        $scope.lodgins[idx].activa = "SI";

        $scope.lodgins[idx].fechasReservadas.cleanElement();
        $scope.lodgins[idx].reservada = false;


        couchinnService.editLodgin($scope.lodgins[idx]).then(function () {
          $mdDialog.show(
            $mdDialog.alert()
              .parent(angular.element(document.querySelector('#popupContainer')))
              .clickOutsideToClose(true)
              .title('La Publicacion ha sido Activada!!')
              .textContent('Ya pueden realizarse solicitudes sobre la misma ')
              .ariaLabel('Alert Dialog Demo')
              .ok('Continuar')
          );
        });
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
                      console.log('successfull created lodgin : ----------------');
                      console.log(JSON.stringify(lodgin));
                      $mdDialog.show(
                        $mdDialog.alert()
                          .parent(angular.element(document.querySelector('#popupContainer')))
                          .clickOutsideToClose(true)
                          .title('Creacion de publicacion exitosa ')
                          .textContent('Se creo correctamente la publicacion: ' + $scope.lodgin.nombre)
                          .ariaLabel('Alert Dialog Demo')
                          .ok('Continuar')
                      );
                      $location.path('/myLodgins');
                    })
                    .catch(function (error) {


                if (error.data.code == 11000) {

                      $mdDialog.show(
                        $mdDialog.alert()
                          .parent(angular.element(document.querySelector('#popupContainer')))
                          .clickOutsideToClose(true)
                          .title('Error al publicar')
                          .textContent('El nombre de la publicacion ya existe')
                          .ariaLabel('Alert Dialog Demo')
                          .ok('Reintentar')
                      );
              }
              else{

              $mdDialog.show(
                                $mdDialog.alert()
                                  .parent(angular.element(document.querySelector('#popupContainer')))
                                  .clickOutsideToClose(true)
                                  .title('Error de registro ')
                                  .textContent('hubo un error registrando la publicacion: ' + JSON.stringify($scope.lodgin.nombre))
                                  .ariaLabel('Alert Dialog Demo')
                                  .ok('Entiendo')
                              );



              };

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
