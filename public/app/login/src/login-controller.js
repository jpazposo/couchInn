"use strict";
angular.module('login').controller(
    'loginController',
    [
        '$scope',
        'couchinnService',
        '$location',
        'jwtHelper',
        '$mdDialog',
        function ($scope, couchinnService, $location, jwtHelper, $mdDialog) {
          console.log('se cargó el controller loginController');

          $scope.headerButtons = [
            {
              location: '/register',
              name: 'Registrarse'
            },
            {
              location: '/',
              name: 'Acerca de'
            }
          ];

          $scope.login = function () {
            couchinnService.login({
                username: $scope.username,
                password: $scope.password
            }).then(function (token) {
              var user = jwtHelper.decodeToken(token);
              couchinnService.setUser(user);
              $location.path('/user-logged/' + user.nombre);
              return token;
            }).catch(function (err) {
              //alert("Usuario Inexistente, vuelve a intentar");

              /*alert(JSON.stringify(err));*/

                $mdDialog.show(
                  $mdDialog.alert()
                    .parent(angular.element(document.querySelector('#popupContainer')))
                    .clickOutsideToClose(true)
                    .title('Error de Login')
                    .textContent('Usuario o password incorrectos')
                    .ariaLabel('Alert Dialog Demo')
                    .ok('Reintentar')
                );

                return err;



              $scope.username = $scope.password = '';
            });
          };
        }
    ]
);
