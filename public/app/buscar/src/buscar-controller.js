"use strict";
angular.module('buscar').controller(
    'buscarController',
    [
        '$scope',
        'buscarService',
        function ($scope, buscarService) {
          console.log('se cargó el controller buscarController');

          $scope.headerButtons = [
            {
              location: '/register',
              name: 'Registrate'
            },
            {
              location: '/login',
              name: 'Iniciar Sesión'
            }
          ];
          
          $scope.searchFilter = {};
          $scope.resultList = []:
          
          $scope.search = function () {
            buscarService.buscarPublicaciones(searchFilter)
              .then((result)=> $scope.resultList = result)
              .catch((err)=> console.log(err));
          };
          
          
          
          
        }
    ]
);
