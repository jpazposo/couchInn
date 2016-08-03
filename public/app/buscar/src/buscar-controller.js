"use strict";
angular.module('buscar').controller(
    'buscarController',
    [
        '$scope',
        'buscarService',
        'couchinnService',
        function ($scope, buscarService, couchinnService) {
          console.log('se cargó el controller buscarController');
        }
    ]
).controller(
  'resultadoController',
  [
    '$scope',
    'buscarService',
    'couchinnService',
    '$location',
    function ($scope, buscarService, couchinnService, $location) {
      console.log('se cargó el controller buscarController');


      $scope.selected = [];

      $scope.$watchCollection('selected', function (newVal) {
        console.log(newVal);
      });

      $scope.detalle = function (idx) {
        var lodgin_to_show = $scope.publicaciones[idx];
        console.log('se va a setear la publicacion que se va a mostrat:-----------');
        console.log(JSON.stringify(lodgin_to_show));
        couchinnService.setLodgin(lodgin_to_show)
        $location.path('/detallar-publicacion');

      };


      $scope.user = couchinnService.getUser();

      if (!$scope.user) {
        $scope.headerButtons = [
          {
            location: '/register',
            name: 'Registrate'
          },
          {
            location: '/login',
            name: 'Iniciar Sesión'
          }
        ];
      } else {
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
      };



      $scope.publicaciones = buscarService.getResultados();

    }
  ]
);
