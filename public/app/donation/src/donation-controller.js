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
      $scope.donations = [];
      $scope.user = couchinnService.getUser();
      $scope.medioPago = [
       'RapiPago', 'PagoFacil', 'PayPal','Tarjeta de credito'
       ]

      $scope.user = couchinnService.getUser();
      if (!$scope.user) $location.url('/login');

      $scope.headerButtons = [
        {
          location: '/listadoTipoHospedaje',
          name: 'Listar Tipos de Hospedaje',
          rol: 'admin'
        },
        {
          location: '/nuevoTipoHospedaje',
          name: 'Agregar Tipo de Hospedaje',
          rol: 'admin'
        },
        {
          location: '/myDonations',
          name: 'Mis Donaciones',
          rol: 'user'
        },
        {
          location: '/myLodgins',
          name: 'Mis Publicaciones',
          rol: 'user'
        },
        {
          location: '/actualizar-perfil',
          name: 'Modificar mis datos',
          rol: 'user'
        },
        {
          location: '/donate',
          name: 'Donar',
          rol: 'user'
        },
        {
          location: '/addLodgin',
          name: 'Agregar Publicacion',
          rol: 'user'
        },
        {
          location: '/logout',
          name: 'Cerrar Sesión',
          rol: 'user'
        }
      ].filter(function (button) {
        if ($scope.user.role == 'admin') return true;
        return button.rol == $scope.user.role;
      });
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

        //Obtener Todos las donaciones
           $scope.obtenerDonaciones = function () {
           console.log('se solicita las publicaciones guardadas:-----------');
           console.log(JSON.stringify($scope.donations));

           couchinnService.getDonations($scope.user)
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
