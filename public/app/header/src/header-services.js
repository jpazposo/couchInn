/**
 * Created by luciano on 7/23/16.
 */
angular.module('header').service(
  'headerService',
  [
    'store',
    'couchinnService',
    '$location',
    function (store, couchinnService, $location) {


      var anonymosButtons = [
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

      var userButtons = [
        {
          location: '/listadoTipoHospedaje',
          name: 'Listar Tipos de Hospedaje',
          roles: ['admin', 'user' ]
        },
        {
          location: '/nuevoTipoHospedaje',
          name: 'Agregar Tipo de Hospedaje',
          roles: ['admin']
        },
        {
          location: '/myDonations',
          name: 'Mis Donaciones',
          roles: ['admin', 'user']
        },
        {
          location: '/myLodgins',
          name: 'Mis Publicaciones',
          roles: ['admin', 'user']
        },
        {
          location: '/actualizar-perfil',
          name: 'Modificar mis datos',
          roles: ['admin', 'user']
        },
        {
          location: '/donate',
          name: 'Donar',
          roles: ['admin', 'user']
        },
        {
          location: '/addLodgin',
          name: 'Agregar Publicacion',
          roles: ['admin', 'user']
        },
        {
          location: '/logout',
          name: 'Cerrar Sesión',
          roles: ['admin', 'user']
        },
        {
          location: '/mis-solicitudes',
          name: 'ver mis solicitudes',
          roles: ['admin', 'user']
        },
        {
          location: '/mis-hospedajes',
          name: 'mis hospedajes',
          roles: ['admin', 'user']
        },
        {
          location: '/register',
          name: 'Registrate',
          roles:['anonymous']
        },
        {
          location: '/',
          name: 'Buscar',
          roles:['anonymous']
        },
        {
          location: '/quienes-somos',
          name: 'Acerca de',
          roles:['anonymous']
        },
        {
          location: '/login',
          name: 'Iniciar Sesión',
          roles:['anonymous']
        }
      ];

      var hasPermissions = function (rolOfUser, rolesAllowed) {
        /**
         * @return Bolean
         */
        return(
        rolesAllowed
          .filter(function (role) {
            return rolOfUser == role;
          }).length > 0
        );

      };

      var notThisPage = function (location) {
        /**
         * @return Boolean
         */
        return $location.url() !== location;
      };

      this.getButtons = function () {


        return userButtons
          .filter(function(item){
            return (
            hasPermissions(couchinnService.getUser()?couchinnService.getUser().role:'anonymous', item.roles)
            &&
            notThisPage(item.location))
          });
      };
    }
  ]
);
