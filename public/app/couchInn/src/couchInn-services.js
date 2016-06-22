angular.module('couchinn').service(
    'couchinnService',
    [
        '$resource',
        function ($resource) {

          var apiPath = "/api/";

          var user = {};

          this.registerUser = function  (user) {
            /**
             * @param user type JSON{ nombre: String, Apellido: String, email:String, nacimiento: String, password: String }
             * @return: user
             */
            return $resource(
              apiPath + 'user'
            ).save(user).$promise;

          };

          this.editUser = function (user) {

            return $resource(
              apiPath + 'update/user'
            ).save(user).$promise;
          };

          this.login = function (user) {
            /**
             * @param user type JSON{ username: String, password: String }
             * @return: user
             */
            return $resource(
              apiPath + 'user-action/login'
            ).save(user).$promise;

          };

          this.logout = function () {
            return $resource(
              apiPath + 'user-action/logout'
            ).get().$promise;
          };

          this.getUser = function (user) {
            return this.user;
          };

          this.setUser = function (user) {
            this.user = user;
          };



        }
    ]
);
