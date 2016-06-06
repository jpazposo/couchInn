"use strict";
angular.module('register').controller(
    'registrationController',
    [
        '$scope',
        'couchinnService',
        '$location',
        function ($scope, couchinnService, $location) {
          console.log('se cargó el controller registerController');

          $scope.user = {}; // modelo a completarse con el formulario.


          $scope.headerButtons = [
            {
              location: '/login',
              name: 'Iniciar Sessión'
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
                alert("hubo un error registrando al usuario: " +
                  JSON.stringify($scope.user.nombre)
                );
                if (error.data.code == 11000) {
                  alert(
                    "Correo Electrónico ya registrado"
                  );
                }
                console.log(error);
              });
          }


        }
    ]
);
