"use strict";
angular.module('buscar').directive(
  'publicacion',
  [
    'couchinnService',
    '$location',
    function (couchinnService, $location) {
      return {
        restrict: 'AE',
        replace: true,
        scope: {
          data: '=',
          indice: '=',
          publicaciones: '='
        },
        link: function ($scope) {
          $scope.detalle = function (idx) {
            var lodgin_to_show = $scope.publicaciones[idx];
            console.log('se va a setear la publicacion que se va a mostrat:-----------');
            console.log(JSON.stringify(lodgin_to_show));
            couchinnService.setLodgin(lodgin_to_show)
            $location.path('/detallar-publicacion');

          };
        },
        transclude: false,
        templateUrl: 'app/buscar/src/html/publicacion.html'
      }
    }
  ]
).directive(
  'buscar',
  [
    'buscarService',
    '$location',
    'couchinnService',
    function (buscarService, $location, couchinnService) {
      return {
        restrict: 'AE',
        replace: true,
        link: function ($scope) {

          $scope.searchFilter = {
        /*    fechaInicio: new Date(),
            fechaFin: new Date()*/
          };
          $scope.publicaciones = [];


          couchinnService.obtenerTiposDeHospedaje()
            .then(function (hospedajes) {
              $scope.tiposHospedajes = hospedajes;
            });

          $scope.search = function () {
            buscarService.buscarPublicaciones($scope.searchFilter)
              .then(function(publicaciones){
                buscarService.setResultados(publicaciones);
                $location.url('/resultados');
              })
              .catch(function (err) {
                console.log(err);
              });
          };

        },
        transclude: false,
        templateUrl: 'app/buscar/src/html/buscar.html'
      }
    }
  ]
);
