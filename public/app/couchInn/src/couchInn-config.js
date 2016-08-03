"use strict";
angular.module("couchinn",
    [
        'ngRoute',
        'ngMaterial',
        'ngMessages',
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
        'buscar',
        'misSolicitudes'
    ]

).config(
    [
        '$routeProvider',
        function ($routeProvider) {



          $routeProvider
            .when(
              '/',
              {
                templateUrl: 'app/buscar/src/html/couchinn.html',
                controller: 'buscarController'
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
              '/actualizar-tipo',
              {
                templateUrl: 'app/tipoHospedaje/src/html/nuevoTipoHospedaje.html',
                controller: 'editTipoController'
              }
            )

            .when(
              '/actualizar-publicacion',
              {
                templateUrl: 'app/lodgin/src/html/addLodgin.html',
                controller: 'editLodginController'
              }
            )
            .when(
              '/detallar-publicacion',
              {
                templateUrl: 'app/lodgin/src/html/lodginDetails.html',
                controller: 'detailLodginController'
              }
            )

            .when(
              '/actualizar-solisitud',
              {
                templateUrl: 'app/mis-solicitudes/src/html/editSolicitud.html',
                controller: 'editSolicitudController'
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

            .when(
              '/ganancia',
              {
                templateUrl: 'app/donation/src/html/ganancia.html',
                controller: 'gananciaController'
              }
             )

            .when(
              '/mis-hospedajes',
              {
                templateUrl: 'app/lodgin/src/html/misHospedajes.html',
                controller: 'misHospedajesController'
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
