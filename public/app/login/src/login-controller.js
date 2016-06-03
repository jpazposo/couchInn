"use strict";
angular.module('login').controller(
    'loginController',
    [
        '$scope',
        'couchinnService',
        '$location',
      '$mdDialog',
        function ($scope, couchinnService, $location, $mdDialog) {
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
              //alert("Usuario Inexistente, vuelve a intentar");

              /*alert(JSON.stringify(err));*/

              if (err.status == 401){

                $mdDialog.show(
                  $mdDialog.alert()
                    .parent(angular.element(document.querySelector('#popupContainer')))
                    .clickOutsideToClose(true)
                    .title('Error de Login')
                    .textContent('Usuario o password incorrectos')
                    .ariaLabel('Alert Dialog Demo')
                    .ok('Reintentar')
                );

                return;

              }

              $scope.username = $scope.password = '';
            });
          };
        }
    ]
);
