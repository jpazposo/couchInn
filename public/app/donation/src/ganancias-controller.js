"use strict";
angular.module('donation').controller(
  'gananciaController',
  [
    '$scope',
    'couchinnService',
    '$location',
    '$mdDialog',
    function ($scope, couchinnService, $location, $mdDialog) {
      console.log('se cargó el controller gananciaController');

      $scope.donation = {}; // modelo a completarse con el formulario.
      $scope.donations = [];
      $scope.user = couchinnService.getUser();
      $scope.donation.fechaInicio = new Date();
      $scope.donation.fechaFin = new Date();
      $scope.user = couchinnService.getUser();
      if (!$scope.user) $location.url('/login');


      //Obtener Todos las donaciones

      $scope.ObtenerGanancia = function () {
         console.log('se van a obtener las donacione entre las fechas:-----------');
           couchinnService.getDonations($scope.donation)
           .then(function (donations){
            $scope.donations = donations
            console.log(JSON.stringify($scope.donations));
            $mdDialog.show(
              $mdDialog.alert()
               .parent(angular.element(document.querySelector('#popupContainer')))
               .clickOutsideToClose(true)
               .title('Modificacion de publicacion exitosa ')
               .textContent('Se obtubieron las donaciones entre las fechas : ' + $scope.donation.fechaInicio + ' y ' + $scope.donation.fechaFin )
               .ariaLabel('Alert Dialog Demo')
               .ok('Continuar')
            );
           });
      };

      $scope.calcularTotal = function (lista) {
         var resultado = 0;
         if (lista.length == 0){
            return 'Sin Ganacias'
         }
         else{
            for (var i in lista){
               resultado = resultado + lista[i].monto;
            }
            return resultado + ' ( Donaciones: ' + lista.length + ' )';
         };
      };

   }
  ]
);
