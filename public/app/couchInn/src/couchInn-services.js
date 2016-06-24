angular.module('couchinn').service(
    'couchinnService',
    [
        '$resource',
        'store',
        'jwtHelper',
        function ($resource, store, jwtHelper) {

          var apiPath = "/user-action/";
          var adminPath = "/admin/";

          var user = {};

          this.registerUser = function  (user) {
            /**
             * @param user type JSON{ nombre: String, Apellido: String, email:String, nacimiento: String, password: String }
             * @return: user
             */

           user.username = user.email; // Esto es una decision arbitriaria de la aplicación, el username es el email.
            return $resource(
               '/api/register'
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
              '/api/login'
            ).save(user).$promise.then(function (jwt) {
              store.set('token', jwt.token);
              return jwt.token;
            });

          };

          this.logout = function () {
            return $resource(
               '/user-action/logout'
            ).get().$promise.then(function () {
                store.remove('token');
                store.remove('user');
            });
          };

          this.getUser = function (user) {
            return store.get('user');
          };

          this.setUser = function (user) {
            store.set('user', user);
          };

          this.guardarTipoHospedaje = function  (tipoHospedaje) {

            return $resource(
              adminPath + 'tipoHospedaje'
            ).save(tipoHospedaje).$promise;

          };

          this.obtenerTiposDeHospedaje = function  (tiposDeHospedaje) {

            return $resource(
              apiPath + 'tiposDeHospedaje'
            ).get(tiposDeHospedaje).$promise.then(function (response) {
              return response.data;
            });

          };

          this.addLodgin = function  (lodgin) {

            return $resource(
             apiPath + 'lodgin'
            ).save(lodgin).$promise;

          };

          this.getLodgins = function  () {

            return $resource(
              apiPath + 'lodgin'
            ).get().$promise.then(function (response) {
              return response.data;
            });

          };

          this.getLodginsByUser = function (user){
            return $resource(
              apiPath + 'lodgin'
            ).get().$promise.then(function (response) {
              return response.data.filter(function (lodgin) {
                  return lodgin.user.username === user.username;
              });
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
