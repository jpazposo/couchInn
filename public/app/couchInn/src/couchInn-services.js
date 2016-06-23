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

           user.username = user.email; // Esto es una decision arbitriaria de la aplicación, el username es el email.
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

          this.addLodgin = function  (lodgin) {

            return $resource(
             apiPath + 'lodgin'
            ).save(lodgin).$promise;

          };

          this.getLodgins = function  (lodgin) {

            return $resource(
              apiPath + 'lodgin'
            ).get(lodgin).$promise.then(function (response) {
              return response.data;
            });

          };

          this.addDonation = function  (donation) {

            return $resource(
             apiPath + 'donation'
            ).save(donation).$promise;

          };

          this.getDonations = function  (donation) {

            return $resource(
             apiPath + 'donation'
             ).get(donation).$promise.then(function (response) {
             return response.data;
             });

           };


        }
    ]
);
