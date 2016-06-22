angular.module('tipoHospedaje').service(
  'tipoHospedajeService',
  [
    '$resource',
    function ($resource) {

      var apiPath = "/api/";

      var tipoHospedajeSeleccionado = {};

 //     this.registerUser = function  (user) {
   //     /**
  //       * @param user type JSON{ nombre: String, Apellido: String, email:String, nacimiento: String, password: String }
  //       * @return: user
   //      */
  //      return $resource(
  //        apiPath + 'user'
  //      ).save(user).$promise;

//      };



      this.getTipoHospedaje = function (tipoHospedajeSeleccionado) {
        return this.tipoHospedajeSeleccionado;
      };

      this.setTipoHospedaje = function (tipoHospedajeSeleccionado) {
        this.tipoHospedajeSeleccionado = tipoHospedajeSeleccionado;
      };

     // this.editUser = function (user) {

      //  return $resource(
       //   apiPath + 'update/user'
      //  ).save(user).$promise;
    //  };

//      this.login = function (user) {
 //       /**
  //       * @param user type JSON{ username: String, password: String }
   //      * @return: user
    //     */
    //    return $resource(
    //      apiPath + 'user-action/login'
    //    ).save(user).$promise;

   //   };

    //  this.logout = function () {
   //     return $resource(
  //        apiPath + 'user-action/logout'
  //      ).get().$promise;
   //   };

//      this.getUser = function (user) {
 //       return this.user;
  //    };

//      this.setUser = function (user) {
 //       this.user = user;
  //    };

      this.guardarTipoHospedaje = function  (tipoHospedaje) {

        return $resource(
          apiPath + 'tipoHospedaje'
        ).save(tipoHospedaje).$promise;

      };

      this.obtenerTiposDeHospedaje = function(tiposDeHospedaje) {

        return $resource(
          apiPath + 'tiposDeHospedaje'
        ).get(tiposDeHospedaje).$promise.then(function(response) {
          return response.data;
        });

      };

      this.obtenerUnTipoHospedaje = function(tipoHospedaje) {

        return $resource(
          apiPath + '/buscarTipoHospedaje/:nombre/:capacidadMax'
        ).get(tipoHospedaje).$promise
          .then(function (response) {
          return response.data;
        });

      };


    }
  ]
);
