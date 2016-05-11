"use strict";
var myApp = angular.module("couchinn",
    [
        'ngRoute',
        'ngMaterial',
        'ngAria'

    ]

).config(
    [
        '$routeProvider',
        function ($routeProvider) {

          $routeProvider.when(
            '/ruta-interna',
            {
              templateUrl: 'app/couchInn/src/html/couchinn.html',
              controller: 'couchInnController'
            }
          ).otherwise(
            {
              redirectTo: '/404'
            }
          );

        }
    ]
);
