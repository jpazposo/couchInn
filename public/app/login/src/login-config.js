"use strict";
angular.module("login", ['angular-jwt']).config(
  [
    '$routeProvider',
    function ($routeProvider) {
      $routeProvider
        .when(
          '/recuperar-clave',
          {
            templateUrl: 'app/login/src/html/recuperar-clave.html',
            controller: 'loginController'
          }
        );
    }
  ]
);
