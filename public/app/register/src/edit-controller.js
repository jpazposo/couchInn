/**
 * Created by luciano on 03/06/16.
 */
"use strict";
angular.module('register').controller(
  'editController',
  [
    '$scope',
    'couchinnService',
    '$location',
    '$mdDialog',
    function ($scope, couchinnService, $location, $mdDialog) {
      console.log('se cargó el controller registerController');

      $scope.user = couchinnService.getUser();


      $scope.headerButtons = [
        {
          location: '/login',
          name: 'Iniciar Sessión'
        }
      ];

      $scope.register = function () {
        console.log('se va a modificar a este usuario:-----------');
        console.log(JSON.stringify($scope.user));

        couchinnService.editUser($scope.user)
          .then(function (user) {
            console.log('successfull modification of : ----------------');
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
