"use strict";
angular.module('updateUser').controller(
    'updateUserController',
 [
        '$scope',
        'couchinnService',
        '$location',
        function ($scope, couchinnService, $location) {
          console.log('se cargó el controller updateUserController');

          $scope.user = couchinnService.getUser();


          $scope.headerButtons = [
            {
              location: '/nuevoTipoHospedaje',
              name: 'Nuevo Tipo de Hospedaje'
            },
            {
              location: '/tipoHospedaje',
              name: 'Tipo de Hospedaje'
            },
            {
              location: '/logout',
              name: 'Cerrar Sesión'
            },
            {
              location:'/updateUser',
              name: 'Modificar Usuario'
            }
         ];

      }
 ]
);
