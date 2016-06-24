"use strict";
angular.module('donation').controller(
  'donationController',
  [
    '$scope',
    'couchinnService',
    '$location',
    function ($scope, couchinnService, $location) {
      console.log('se cargó el controller donationController');

      $scope.donation = {}; // modelo a completarse con el formulario.
      $scope.donations = [];
      $scope.medioPago = [
       'RapiPago', 'PagoFacil', 'PayPal','Tarjeta de credito'
       ]

      $scope.headerButtons = [
        {
          location: '/listadoTipoHospedaje',
          name: 'Listar Tipos de Hospedaje'
        },
        {
          location: '/nuevoTipoHospedaje',
          name: 'Agregar Tipo de Hospedaje'
        },
        {
          location: '/myDonations',
          name: 'Mis Donaciones'
        },
        {
          location: '/myLodgins',
          name: 'Mis Publicaciones'
        },
        {
          location: '/actualizar-perfil',
          name: 'Modificar mis datos'
        },
        {
          location: '/donate',
          name: 'Donar'
        },
        {
          location: '/addLodgin',
          name: 'Agregar Publicacion'
        },
        {
          location: '/logout',
          name: 'Cerrar Sesión'
        }
      ];

      // guardar donation
        $scope.guardarDonaciones = function () {
          console.log('se va a guardar el la publicacion:-----------');
          console.log(JSON.stringify($scope.donation));

          couchinnService.addDonation($scope.donation)
           .then(function (donation) {
             console.log('se guardo correctamente : ----------------');
             console.log(JSON.stringify(donation));
             $location.path('/myDonations');
           })
           .catch(function (error) {

            // code 11000 means donation already exist
             console.log(error);
           });
        };

        //Obtener Todos las donaciones
           $scope.obtenerDonaciones = function () {
           console.log('se solicita las publicaciones guardadas:-----------');
           console.log(JSON.stringify($scope.donations));

           couchinnService.getDonations()
            .then(function (donations) {
              console.log('se obtuvieron las publicaciones: ----------------');
              console.log(JSON.stringify(donations));
              $scope.donations = donations;
              console.log($scope.donations);

            })
            .catch(function (error) {

             // code 11000 means donation already exist
             console.log(error);
            });
            };

       }
    ]
 );
