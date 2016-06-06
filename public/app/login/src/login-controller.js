"use strict";
angular.module('login').controller(
    'loginController',
    [
        '$scope',
        'couchinnService',
        '$location',
        function ($scope, couchinnService, $location) {
          console.log('se cargó el controller loginController');

          $scope.headerButtons = [
            {
              location: '/register',
              name: 'Registrarse'
            }
          ];

          $scope.login = function () {
            couchinnService.login({
                username: $scope.username,
                password: $scope.password
            }).then(function (user) {
              couchinnService.setUser(user);
              $location.path('/user-logged/' + user.nombre);
            }).catch(function (err) {
              alert("Usuario Inexistente, vuelve a intentar");
              $scope.username = $scope.password = '';
            });
          };
        }
    ]
);
