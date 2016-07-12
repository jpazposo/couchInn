"use strict";
angular.module('buscar').controller(
    'buscarController',
    [
        '$scope',
        'buscarService',
        'couchinnService',
        function ($scope, buscarService, couchinnService) {
          console.log('se cargó el controller buscarController');
                $scope.user = couchinnService.getUser();

                if (!$scope.user) {
                  $scope.headerButtons = [
                      {
                         location: '/register',
                         name: 'Registrate'
                      },
                      {
                         location: '/',
                         name: 'Buscar'
                      },
                      {
                         location: '/quienes-somos',
                         name: 'Acerca de'
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





        }
    ]
).controller(
  'resultadoController',
  [
    '$scope',
    'buscarService',
    'couchinnService',
    function ($scope, buscarService, couchinnService) {
      console.log('se cargó el controller buscarController');


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
