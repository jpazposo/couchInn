"use strict";
angular.module("misSolicitudes", []).config(
  [
    '$routeProvider',
    function ($routeProvider) {
      $routeProvider.when(
        '/mis-solicitudes',
        {
          templateUrl: 'app/mis-solicitudes/src/html/mis-solicitudes.html',
          controller: 'misSolicitudesController'
        }
      );
    }
  ]
);
