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
        }
    ]
);
