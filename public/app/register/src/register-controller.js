"use strict";
angular.module('register').controller(
    'registrationController',
    [
        '$scope',
        'couchinnService',
        function ($scope, couchinnService) {
          console.log('se cargó el controller registerController');


          $scope.register = function () {
            couchinnService.registerUser({
              nombre: "Luciano Mock Test",
              apellido: "perez Mock Test",
              email: "luchopcerra@gmail.com Mock Test",
              nacimiento: "10/10/10 Mock Test",
              password: "pass Mock Test",
            })
              .then(function (user) {
                console.log('successfull registration of : ----------------');
                console.log(JSON.stringify(user));
              })
              .catch(function (error) {
                console.log(error);
              });
          }


        }
    ]
);
