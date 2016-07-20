angular.module('buscar').service(
    'buscarService',
    [
        '$resource',
        function ($resource) {

          var resultados = [];

          this.buscarPublicaciones = function  (searchFilter) {
            /**
             * @param searchFilter type JSON{}
             * @return: Array[ ] Publicacion
             */
            return $resource(
              '/user-action/search'
            ).save(searchFilter).$promise.then(function (response) {
              response.data.forEach(function (lodgin) {
                lodgin.validApplications =
                  lodgin.applications.filter(function (application) {
                    return (application.status != 'rechazada' && moment().isBefore(application.fechaFin));
                  });
              });

              return response.data;
            }).then(function (response) {
              return response.filter(function (lodgin) {
                return !lodgin.reservada;
              });
            });

          };

          this.setResultados = function (resultados) {
            this.resultados = resultados;
          };

          this.getResultados = function () {
            return this.resultados;
          };




        }
    ]
);
