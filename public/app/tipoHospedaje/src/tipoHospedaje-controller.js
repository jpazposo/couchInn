"use strict";
angular.module('tipoHospedaje').controller(
  'tipoHospedajeController',
  [
    '$scope',
    'couchinnService',
    '$mdToast',
    function ($scope, couchinnService,$mdToast) {
      console.log('se cargó el controller tipoHospedajeController');

      $scope.tipoHospedaje = {}; // modelo a completarse con el formulario.
      $scope.tiposDeHospedaje = [];
      $scope.tipoHospedajeSeleccionado = false;
      $scope.error1 = false;


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

      var last = {
        bottom: false,
        top: true,
        left: false,
        right: true
      };

      // guardar Tipo de Hospedaje
      $scope.guardarTipoHosp = function () {
        console.log('se va a guardar el tipo de hospedaje:-----------');
        console.log(JSON.stringify($scope.tipoHospedaje));

        $scope.tipoHospedajeEncontrado = couchinnService.buscarTipoHospedaje($scope.tipoHospedaje.nombre, $scope.tipoHospedaje.capacidadMax);

          if ($scope.tipoHospedajeEncontrado) {
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



    // probando toast


      $scope.toastPosition = angular.extend({},last);
      $scope.getToastPosition = function() {
        sanitizePosition();
        return Object.keys($scope.toastPosition)
          .filter(function(pos) { return $scope.toastPosition[pos]; })
          .join(' ');
      };
      function sanitizePosition() {
        var current = $scope.toastPosition;
        if ( current.bottom && last.top ) current.top = false;
        if ( current.top && last.bottom ) current.bottom = false;
        if ( current.right && last.left ) current.left = false;
        if ( current.left && last.right ) current.right = false;
        last = angular.extend({},current);
      };
      $scope.showSimpleToast = function() {
        var pinTo = $scope.getToastPosition();
        $mdToast.show(
          $mdToast.simple()
            .textContent('Se Guardo el Tipo de Hospedaje!')
            .position(pinTo )
            .hideDelay(3000)
        );
      };
      $scope.showActionToast = function() {
        var pinTo = $scope.getToastPosition();
        var toast = $mdToast.simple()
          .textContent('Marked as read')
          .action('UNDO')
          .highlightAction(true)
          .highlightClass('md-accent')// Accent is used by default, this just demonstrates the usage.
          .position(pinTo);
        $mdToast.show(toast).then(function(response) {
          if ( response == 'ok' ) {
            alert('You clicked the \'UNDO\' action.');
          }
        });
      };
    }])
  .controller('ToastCtrl', function($scope, $mdToast) {
    $scope.closeToast = function() {
      $mdToast.hide();
    };
  });
