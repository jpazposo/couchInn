"use strict";
angular.module('tipoHospedaje').controller(
  'tipoHospedajeController',
  [
    '$scope',
    'couchinnService',
    function ($scope, couchinnService) {
      console.log('se cargó el controller tipoHospedajeController');

      $scope.tipoHospedaje = {}; // modelo a completarse con el formulario.
      $scope.tiposDeHospedaje = [];
      $scope.tipoHospedajeSeleccionado = false;
      $scope.error1 = false;
      $scope.tipoHospedajeEncontrado = {};

      $scope.headerButtons = [
        {
          location: '/listadoTipoHospedaje',
          name: 'Listar Tipos de Hospedaje'
        },
        {
          location: '/nuevoTipoHospedaje',
          name: 'Agregar Tipo de Hospedaje'
        }
      ];

      // guardar Tipo de Hospedaje
      $scope.guardarTipoHosp = function () {
        console.log('se va a guardar el tipo de hospedaje:-----------');
        console.log(JSON.stringify($scope.tipoHospedaje));

        $scope.tipoHospedajeEncontrado = couchinnService.buscarTipoHospedaje();

          if (!$scope.tipoHospedajeEncontrado) {
            couchinnService.guardarTipoHospedaje($scope.tipoHospedaje)
              .then(function (tipoHospedaje) {
                console.log('se guardo correctamente : ----------------');
                console.log(JSON.stringify(tipoHospedaje));
              })
              .catch(function (error) {

                // code 11000 means user already exist
                console.log(error);
              });
          } else {$scope.error1 = true;}

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
            console.log(error);
          });
      };

    }
  ]
);
