"use strict";
angular.module("couchinn",
    [
        'ngRoute',
        'ngMaterial',
        'ngAria',
        'ngResource',
        'header',
        'register',
        'login',
        'tipoHospedaje',
        'listadoTipoHospedaje'
    ]

).config(
    [
        '$routeProvider',
        function ($routeProvider) {

          $routeProvider
            .when(
            '/',
            {
              templateUrl: 'app/couchInn/src/html/couchinn.html',
              controller: 'couchInnController'
            }
          )
            .when(
              '/register',
              {
                templateUrl: 'app/register/src/html/register.html',
                controller: 'registrationController'
              }
            )

            .when(
              '/login',
              {
                templateUrl: 'app/login/src/html/login.html',
                controller: 'loginController'
              }
            )
            .when(
            '/nuevoTipoHospedaje',
            {
              templateUrl: 'app/tipoHospedaje/src/html/nuevoTipoHospedaje.html',
              controller: 'tipoHospedajeController'
            }
            )
            .when(
            '/listadoTipoHospedaje',
            {
              templateUrl: 'app/tipoHospedaje/src/html/listadoTipoHospedaje.html',
              controller: 'tipoHospedajeController'
            }
          )
            .otherwise(
            {
              redirectTo: '/404'
            }
          );

        }
    ]
);
