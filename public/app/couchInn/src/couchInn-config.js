"use strict";
angular.module("couchinn",
    [
        'ngRoute',
        'ngMaterial',
        'ngAria',
        'header'
    ]

).config(
    [
        '$routeProvider',
        function ($routeProvider) {

          $routeProvider.when(
            '/',
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
