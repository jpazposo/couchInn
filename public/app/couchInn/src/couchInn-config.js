"use strict";
angular.module("couchinn",
    [
        'ngRoute',
        'ngMaterial',
        'ngAria',
        'ngResource',
        'angular-jwt',
        'header',
        'register',
        'login',
        'tipoHospedaje',
        'loggedUser'
    ]

).config(
    [
        '$routeProvider',
        function ($routeProvider, $httpProvider, jwtInterceptorProvider) {

          /*jwtInterceptorProvider.tokenGetter = function(config) {
              return localStorage.getItem('id_token');
          };
          $httpProvider.interceptors.push('jwtInterceptor');*/

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
              '/user-logged/:user',
              {
                templateUrl: 'app/loggedUser/src/html/loggedUser.html',
                controller: 'loggedUserController'
              }
            )

            .when(
              '/actualizar-perfil',
              {
                templateUrl: 'app/register/src/html/register.html',
                controller: 'editController'
              }
            )

            .when(
              '/listadoTipoHospedaje',
              {
                templateUrl: 'app/tipoHospedaje/src/html/listadoTipoHospedaje.html',
                controller: 'tipoHospedajeController'
              }
            )
            .when(
              '/updateUser',
              {
                templateUrl: 'app/updateUser/src/html/updateUser.html',
                controller: 'updateUserController'
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
