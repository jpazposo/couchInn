angular.module('couchinn').service(
    'couchinnService',
    [
        '$resource',
        'store',
        function ($resource, store) {

          var apiPath = "/api/";
          var adminPath = "/admin/";

          var user = {};

          this.registerUser = function  (user) {
            /**
             * @param user type JSON{ nombre: String, Apellido: String, email:String, nacimiento: String, password: String }
             * @return: user
             */
            return $resource(
               '/register'
            ).save(user).$promise;

          };

          this.editUser = function (user) {

            return $resource(
              adminPath + 'update/user'
            ).save(user).$promise;
          };

          this.login = function (user) {
            /**
             * @param user type JSON{ username: String, password: String }
             * @return: user
             */
            return $resource(
              '/login'
            ).save(user).$promise.then(function (jwt) {
              store.set('token', jwt.token);
              return jwt.token;
            });

          };

          this.logout = function () {
            return $resource(
               '/user-action/logout'
            ).get().$promise;
          };

          this.getUser = function (user) {
            return this.user;
          };

          this.setUser = function (user) {
            this.user = user;
          };

          this.guardarTipoHospedaje = function  (tipoHospedaje) {

            return $resource(
              adminPath + 'tipoHospedaje'
            ).save(tipoHospedaje).$promise;

          };

          this.obtenerTiposDeHospedaje = function  (tiposDeHospedaje) {

            return $resource(
              adminPath + 'tiposDeHospedaje'
            ).get(tiposDeHospedaje).$promise.then(function (response) {
              return response.data;
            });

          };

          this.buscarTipoHospedaje = function  (nombreTipoDeHospedaje, capacidadTipoDeHospedaje) {

            return $resource(
              adminPath + 'buscarTipoHospedaje'
            ).get(tipoDeHospedaje, capacidadTipoDeHospedaje).$promise.then(function (response) {
              return response.data;
            });

          };


        }
    ]
);
