"use strict";
angular.module('donation').controller(
  'donationController',
  [
    '$scope',
    'couchinnService',
    '$location',
    '$mdDialog',
    function ($scope, couchinnService, $location, $mdDialog) {
      console.log('se cargó el controller donationController');

      $scope.donation = {}; // modelo a completarse con el formulario.
      $scope.user = couchinnService.getUser();
      $scope.donations = [];
      $scope.medioPago = [
       'RapiPago', 'PagoFacil', 'PayPal','Tarjeta de credito'
       ];

      $scope.user = couchinnService.getUser();
      if (!$scope.user) $location.url('/login');


        $scope.volver = function () {
          console.log('se va a modificar el premium de este usuario:-----------');
          console.log(JSON.stringify($scope.user));

          $location.path('/myDonations');
        };
      // guardar donation
        $scope.guardarDonaciones = function () {
          console.log('se va a guardar el la publicacion:-----------');
          console.log(JSON.stringify($scope.donation));

          couchinnService.addDonation($scope.donation)
           .then(function (donation) {
             console.log('se guardo correctamente : ----------------');
             console.log(JSON.stringify(donation));
             $location.path('/accredit');
           })
           .catch(function (error) {
             $mdDialog.show(
               $mdDialog.alert()
                 .parent(angular.element(document.querySelector('#popupContainer')))
                 .clickOutsideToClose(true)
                 .title('Error al enviar una donación')
                 .textContent('Hubo un problema al interno')
                 .ariaLabel('Alert Dialog Demo')
                 .ok('Reintentar')
             );
            // code 11000 means donation already exist
             console.log(error);
           });
        };



           couchinnService.getDonationsByUser($scope.user)
           .then(function (donations){
            $scope.donations = donations
            console.log($scope.donations);
           });



            $scope.calcularTotal = function (lista) {
              var resultado = 0;
              if (lista.length == 0){
                return 'aun no a donado'
              }
              else{
                for (var i in lista){
                  resultado = resultado + lista[i].monto;
                }
                return resultado;
              };
            };

       }
    ]
 );
