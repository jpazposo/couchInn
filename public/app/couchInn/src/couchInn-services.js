angular.module('couchinn').service(
    'couchinnService',
    [
        '$resource',
        function ($resource) {

          var apiPath = "/api/";

          this.registerUser = function  (user) {
            /**
             * @param user type JSON{ nombre: String, Apellido: String, email:String, nacimiento: String, password: String }
             * @return: user
             */
            return $resource(
              apiPath + 'user'
            ).save(user).$promise;

          };

          this.login = function (user) {
            /**
             * @param user type JSON{ username: String, password: String }
             * @return: user
             */
            return $resource(
              apiPath + 'user/login'
            ).save(user).$promise;
          };

          this.logout = function () {
            return $resource(
              apiPath + 'user/logout'
            ).get().$promise;
          };

          this.guardarTipoHospedaje = function  (tipoHospedaje) {

            return $resource(
              apiPath + 'tipoHospedaje'
            ).save(tipoHospedaje).$promise;

          };

          this.obtenerTiposDeHospedaje = function  (tiposDeHospedaje) {

            return $resource(
              apiPath + 'tiposDeHospedaje'
            ).get(tiposDeHospedaje).$promise.then(function (response) {
              return response.data;
            });

          };

        }
    ]
);
