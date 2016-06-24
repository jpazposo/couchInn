angular.module('tipoHospedaje').service(
  'tipoHospedajeService',
  [
    '$resource',
    function ($resource) {

      var apiPath = "/admin/";

      var tipoHospedajeSeleccionado = {};

      this.getTipoHospedaje = function (tipoHospedajeSeleccionado) {
        return this.tipoHospedajeSeleccionado;
      };

      this.setTipoHospedaje = function (tipoHospedajeSeleccionado) {
        this.tipoHospedajeSeleccionado = tipoHospedajeSeleccionado;
      };

  //    this.guardarTipoHospedaje = function  (tipoHospedaje) {
//
  //      return $resource(
 //         apiPath + 'tipoHospedaje'
  //      ).save(tipoHospedaje).$promise;
//
  //    };

      this.obtenerTiposDeHospedaje = function(tiposDeHospedaje) {

        return $resource(
          apiPath + 'tiposDeHospedaje'
        ).get(tiposDeHospedaje).$promise.then(function(response) {
          return response.data;
        });

      };

 //     this.obtenerUnTipoHospedaje = function(tipoHospedaje) {

  //      return $resource(
   //       apiPath + 'buscarTipoHospedaje/:nombre'
  //      ).get(tipoHospedaje).$promise
   //       .then(function (response) {
    //      return response.data;
    //    });

    //  };


    }
  ]
);
