"use strict";
angular.module('buscar').directive(
  'publicacion',
  [
    function () {
      return {
        restrict: 'AE',
        replace: true,
        scope: {
          data: '='
        },
        link: function () {

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
