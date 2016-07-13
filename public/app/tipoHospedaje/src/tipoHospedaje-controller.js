"use strict";
angular.module('tipoHospedaje').controller(
  'tipoHospedajeController',
  [
    '$scope',
    'couchinnService',
    '$location',
    '$mdDialog',
    function ($scope, couchinnService, $location, $mdDialog) {
      console.log('se cargó el controller tipoHospedajeController');

      $scope.tipoHospedaje = {}; // modelo a completarse con el formulario.
      $scope.tiposDeHospedaje = [];
      $scope.tipoHospedajeSeleccionado = false;
      $scope.error1 = false;

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

      // guardar Tipo de Hospedaje
      $scope.guardarTipoHosp = function () {
        console.log('se va a guardar el tipo de hospedaje:-----------');
        console.log(JSON.stringify($scope.tipoHospedaje));
        couchinnService.guardarTipoHospedaje($scope.tipoHospedaje)
          .then(function (tipoHospedaje) {
            console.log('se guardo correctamente : ----------------');
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

      $scope.modificar = function (idx) {
        var tipo_to_modified = $scope.tiposDeHospedaje[idx];
        console.log('se va a setear el tipo a modificar:-----------');
        console.log(JSON.stringify(tipo_to_modified));
        couchinnService.setTipo(tipo_to_modified)
        $location.path('/actualizar-tipo');

      };

      $scope.eliminar = function (idx) {
        var tipo_to_delete = $scope.tiposDeHospedaje[idx];
        console.log('se va a borrar el tipo de hospedaje:-----------');
        console.log(JSON.stringify(tipo_to_delete));
        couchinnService.deleteTipoHospedaje(tipo_to_delete)
          .then(function (tipoHospedaje) {
            console.log('se elimino correctamente : ----------------');
            console.log(JSON.stringify(tipoHospedaje));
            $location.path('/listadoTipoHospedaje');
            $mdDialog.show(
              $mdDialog.alert()
                .parent(angular.element(document.querySelector('#popupContainer')))
                .clickOutsideToClose(true)
                .title('Elimino tipo')
                .textContent('Se elimino correctamente')
                .ariaLabel('Alert Dialog Demo')
                .ok('Volver')
            );
          });
        couchinnService.obtenerTiposDeHospedaje()
          .then(function(tiposDeHospedaje){
            $scope.tiposDeHospedaje = tiposDeHospedaje;
          });

      };

      //Obtener Todos los tipos de hospedaje
      $scope.dameTiposDeHospedaje = function () {
        console.log('se solicitan los tipos guardados:-----------');
        console.log(JSON.stringify($scope.tiposDeHospedaje));

        couchinnService.obtenerTiposDeHospedaje()
          .then(function (tiposDeHospedaje) {
            console.log('se obtuvieron los tipos: ----------------');
            console.log(JSON.stringify(tiposDeHospedaje));
            $scope.tiposDeHospedaje = tiposDeHospedaje;
            console.log($scope.tiposDeHospedaje);

          })
          .catch(function (error) {


                if (error.data.code == 11000) {
                  $mdDialog.show(
                    $mdDialog.alert()
                      .parent(angular.element(document.querySelector('#popupContainer')))
                      .clickOutsideToClose(true)
                      .title('Error al agregar tipo ')
                      .textContent('El nombre ya esta agregado: ')
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
