"use strict";
angular.module("couchinn",
    [
        'ngRoute',
        'ngMaterial',
        'ngAria',
        'ngResource',
        'header',
        'register',
        'login'
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

            .otherwise(
            {
              redirectTo: '/404'
            }
          );

        }
    ]
);
