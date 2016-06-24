"use strict";
angular.module('tipoHospedaje').controller(
  'tipoHospedajeController',
  [
    '$scope',
    'couchinnService',
    '$mdToast',
    '$location',
    '$resource',
    '$mdDialog',
    function ($scope, couchinnService,$mdToast, $location, $resource, $mdDialog) {

      console.log('se cargó el controller tipoHospedajeController');

      $scope.tipoHospedaje = {}; // modelo a completarse con el formulario.
      $scope.tiposDeHospedaje = [];
      $scope.tipoHospedajeSeleccionado = false;
      $scope.tipoHospedajeEncontrado = {};
      $scope.error1 = false;


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
          location: '/myLodgins',
          name: 'Mis Publicaciones'
        },
        {
          location: '/actualizar-perfil',
          name: 'Modificar mis datos'
        },
        {
          location: '/donate',
          name: 'Donar'
        },
        {
          location: '/addLodgin',
          name: 'Agregar Publicacion'
        },
        {
          location: '/logout',
          name: 'Cerrar Sesión'
        }
      ];

      var last = {
        bottom: false,
        top: true,
        left: false,
        right: true
      };

      $scope.buscarTipoHospedaje = function () {

        couchinnService.obtenerUnTipoHospedaje(
          {
            nombre: $scope.tipoHospedaje.nombre
          }
          )
          .then(function (tipoHospedajeEncontrado) {
            console.log($scope.tipoHospedajeEncontrado.nombre);
            $scope.tipoHospedajeEncontrado = tipoHospedajeEncontrado;
            if (!$scope.tipoHospedajeEncontrado) {
              $scope.error1 = true;
              console.log($scope.tipoHospedajeEncontrado.nombre);
            }
          })
          .catch(function (error) {
            console.log("errrorororor");
          });
      };


      // guardar Tipo de Hospedaje
      $scope.guardarTipoHosp = function () {
        console.log('se va a guardar el tipo de hospedaje:-----------');
        console.log(JSON.stringify($scope.tipoHospedaje));

        $scope.tipoHospedajeEncontrado = couchinnService.obtenerUnTipoHospedaje({
          nombre: $scope.tipoHospedaje.nombre
        }).then(
          function(){
            if (!$scope.tipoHospedajeEncontrado) {
              couchinnService.guardarTipoHospedaje($scope.tipoHospedaje).then(
                function (res) {
                  if (res.statusCode = 201) {
                    $mdDialog.show(
                      $mdDialog.alert()
                        .parent(angular.element(document.querySelector('#popupContainer')))
                        .clickOutsideToClose(true)
                        .title('Operacion exitosa!!')
                        .textContent('se registro un nuevo tipo de hospedaje')
                        .ariaLabel('Alert Dialog Demo')
                        .ok('Cerrar'))
                  }
                }
              ).catch(function (error) {
                console.log(error);
              });

            }else{

              $mdDialog.show(
                        $mdDialog.alert()
                         .parent(angular.element(document.querySelector('#popupContainer')))
                        .clickOutsideToClose(true)
                       .title('Error en el ingreso de nuevo Tipo de Hospedaje')
                      .textContent('los datos ingresados ya existen y no pueden repetirse')
                     .ariaLabel('Alert Dialog Demo')
                    .ok('Reintentar'));
              $scope.tipoHospedajeEncontrado = {};
            }
          }).catch(function (error) {
          console.log(error);
          console.log($scope.tipoHospedajeEncontrado);
        });


//        this.buscarTipoHospedaje().then(
 //         function (res) {
  //          if (res.status = 404) {
   //           tipoHospedajeService.guardarTipoHosp();
    //        } else {
     //         $mdDialog.show(
      //          $mdDialog.alert()
       //           .parent(angular.element(document.querySelector('#popupContainer')))
        //          .clickOutsideToClose(true)
         //         .title('Error en el ingreso de nuevo Tipo de Hospedaje')
          //        .textContent('los datos ingresados ya existen y no pueden repetirse')
           //       .ariaLabel('Alert Dialog Demo')
            //      .ok('Reintentar')
//              );
 //           }
  //        }
  //      ).catch(function (error) {

          // code 11000 means user already exist
    //      console.log(error);
     //   });

      };

      //Obtener Todos los tipos de hospedaje
      $scope.dameTiposDeHospedaje = function () {
        console.log('se solicitan los tipos guardados:-----------');
        console.log(JSON.stringify($scope.tiposDeHospedaje));

        couchinnService.obtenerTiposDeHospedaje()
          .then(function (tiposDeHospedaje) {
            console.log('se obtuvieron los tipos: ----------------');
            console.log(JSON.stringify(tiposDeHospedaje));
            $scope.tiposDeHospedaje = tiposDeHospedaje;
            console.log($scope.tiposDeHospedaje);

          })
          .catch(function (error) {

            // code 11000 means user already exist


          })
      }
    }
    ]
);
