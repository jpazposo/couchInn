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
              return response.data;
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
