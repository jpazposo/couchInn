"use strict";
angular.module('buscar').controller(
    'buscarController',
    [
        '$scope',
        'buscarService',
        function ($scope, buscarService) {
          console.log('se cargó el controller buscarController');



          $scope.searchFilter = {};
          $scope.publicaciones = [];

          $scope.search = function () {
            buscarService.buscarPublicaciones(searchFilter)
              .then(function(publicaciones){
                $scope.publicaciones = publicaciones;
                $location.url('/resulados');
              })
              .catch(function (err) {
                console.log(err);
              });
          };
        }
    ]
);
