angular.module('couchinn').service(
    'couchinnService',
    [
        '$resource',
        'store',
        'jwtHelper',
        function ($resource, store, jwtHelper) {

          var apiPath = "/user-action/";
          var pathAnonimo = "/api/";
          var adminPath = "/admin/";

          var user = {};
          var tipoHospedaje = {};
          var lodgin = {};
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


          this.getTipo = function (tipoHospedaje) {
            return store.get('tipoHospedaje');
          };

          this.setTipo = function (tipoHospedaje) {
            store.set('tipoHospedaje', tipoHospedaje);
          };

          this.getLodgin = function (lodgin) {
            return store.get('lodgin');
          };

          this.setLodgin = function (lodgin) {
            store.set('lodgin', lodgin);
          };

          this.editLodgin = function (lodgin) {
            return $resource(
              apiPath + 'update/lodgin'
             ).save(lodgin).$promise;
          };

          this.guardarTipoHospedaje = function  (tipoHospedaje) {

            return $resource(
              adminPath + 'tipoHospedaje'
            ).save(tipoHospedaje).$promise;

          };

          this.obtenerTiposDeHospedaje = function  (tiposDeHospedaje) {

            return $resource(
              pathAnonimo + 'tiposDeHospedaje'
            ).get().$promise.then(function (response) {
              return response.data;
            });

          };


          this.editTipoHospedaje = function (tipoHospedaje) {
            return $resource(
              adminPath + 'update/tipoHospedaje'
             ).save(tipoHospedaje).$promise;
          };

          this.deleteTipoHospedaje = function (tipoHospedaje) {
            return $resource(
              adminPath + 'delete/tipoHospedaje'
             ).save(tipoHospedaje).$promise;
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

          this.getDonations = function  (user) {

            return $resource(
             apiPath + 'donation'
             ).get().$promise.then(function (response) {
               return response.data.filter(function (donation) {
               return donation.user.username === user.username;
               });
             });
          };


        }
    ]
);
