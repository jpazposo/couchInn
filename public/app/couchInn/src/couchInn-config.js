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
        'loggedUser',
        'lodgin',
        'donation',
        'ajaxInterceptor',
        'angular-storage',
        'buscar'
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
              '/quienes-somos',
              {
                templateUrl: 'app/couchInn/src/html/acercade.html',
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
              '/addLodgin',
              {
                templateUrl: 'app/lodgin/src/html/addLodgin.html',
                controller: 'lodginController'
              }
            )

            .when(
              '/myLodgins',
              {
                templateUrl: 'app/lodgin/src/html/myLodgins.html',
                controller: 'lodginController'
              }
            )

            .when(
              '/myDonations',
              {
                templateUrl: 'app/donation/src/html/myDonations.html',
                controller: 'donationController'
              }
            )

            .when(
              '/donate',
              {
                templateUrl: 'app/donation/src/html/donate.html',
                controller: 'donationController'
              }
            )
            .when(
              '/accredit',
              {
                templateUrl: 'app/donation/src/html/accredit.html',
                controller: 'donationController'
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
