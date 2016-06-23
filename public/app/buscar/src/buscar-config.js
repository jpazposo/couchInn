"use strict";
angular.module("buscar",
    [
        'ngRoute'
    ]

).config(
    [
        '$routeProvider',
        function ($routeProvider) {

          $routeProvider
            .when(
              '/resultados',
              {
                templateUrl: 'app/buscar/src/html/resultados.html',
                controller: 'buscarController'
              }
            );
          

        }
    ]
);
