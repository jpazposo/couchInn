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
                controller: 'resultadoController'
              }
            )
          .when(
            '/buscar',
            {
              templateUrl: 'app/buscar/src/html/buscar.html',
              controller: 'buscarController'
            }
          );


        }
    ]
);
