"use strict";
angular.module("solicitudes",
    [
        'ngRoute'
    ]

).config(
    [
        '$routeProvider',
        function ($routeProvider) {

          $routeProvider
            .when(
              '/solicitudes-aceptadas',
              {
                templateUrl: 'app/solicitudes/src/html/solicitudes-entre-fechas.html',
                controller: 'solicitudesController'
              }
            );
        }
    ]
);
