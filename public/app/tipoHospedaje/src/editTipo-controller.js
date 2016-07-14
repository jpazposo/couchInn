"use strict";
angular.module('tipoHospedaje').controller(
  'editTipoController',
  [
    '$scope',
    'couchinnService',
    '$location',
    '$mdDialog',
    function ($scope, couchinnService, $location, $mdDialog) {
      console.log('se cargó el controller editTipoController');

      $scope.tipoHospedaje = couchinnService.getTipo(); // modelo a completarse con el formulario.
      $scope.tipoHospedajeSeleccionado = false;
      $scope.error1 = false;
      console.log(JSON.stringify($scope.tipoHospedaje));
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
          location: '/',
          name: 'Buscar'
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

      // modificar Tipo de Hospedaje
      $scope.guardarTipoHosp = function () {
        console.log('se va a guardar el tipo de hospedaje:-----------');
        console.log(JSON.stringify($scope.tipoHospedaje._id));

          couchinnService.editTipoHospedaje ($scope.tipoHospedaje)
          .then(function (tipoHospedaje) {
            console.log('se modifico correctamente : ----------------');
            console.log(JSON.stringify(tipoHospedaje));
            $location.path('/listadoTipoHospedaje');
          })
          .catch(function (error) {
            $mdDialog.show(
              $mdDialog.alert()
                .parent(angular.element(document.querySelector('#popupContainer')))
                .clickOutsideToClose(true)
                .title('Error al publicar')
                .textContent('datos duplicados o incorrectos')
                .ariaLabel('Alert Dialog Demo')
                .ok('Reintentar')
            );
            console.log(error);
          });
      };



        }
    ]
);
