"use strict";
angular.module('register').controller(
    'registrationController',
    [
        '$scope',
        'couchinnService',
        '$location',
      '$mdDialog',
        function ($scope, couchinnService, $location, $mdDialog) {
          console.log('se cargó el controller registerController');

          $scope.user = {}; // modelo a completarse con el formulario.
          $scope.role= [
            'Administrador', 'Usuario'
          ]

          $scope.headerButtons = [
            {
              location: '/login',
              name: 'Iniciar Sessión'
            },
            {
              location: '/',
              name: 'Acerca de'
            }
          ];

          $scope.register = function () {
            console.log('se va a registrar a este usuario:-----------');
            console.log(JSON.stringify($scope.user));

            couchinnService.registerUser($scope.user)
              .then(function (user) {
                console.log('successfull registration of : ----------------');
                console.log(JSON.stringify(user));
                $location.url('/login');
              })
              .catch(function (error) {

                // code 11000 means user already exist


                $mdDialog.show(
                  $mdDialog.alert()
                    .parent(angular.element(document.querySelector('#popupContainer')))
                    .clickOutsideToClose(true)
                    .title('Error de registro ')
                    .textContent('hubo un error registrando al usuario: ' + JSON.stringify($scope.user.nombre))
                    .ariaLabel('Alert Dialog Demo')
                    .ok('Entiendo')
                );


                if (error.data.code == 11000) {
                  $mdDialog.show(
                    $mdDialog.alert()
                      .parent(angular.element(document.querySelector('#popupContainer')))
                      .clickOutsideToClose(true)
                      .title('Error de registro ')
                      .textContent('Correo Electrónico ya registrado: ')
                      .ariaLabel('Alert Dialog Demo')
                      .ok('Reintentar')

                  );
                }
                console.log(error);
              });
          }


        }
    ]
);
