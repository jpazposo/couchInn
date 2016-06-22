angular.module('buscar').service(
    'buscarService',
    [
        '$resource',
        function ($resource) {

          this.buscarPublicaciones = function  (searchFilter) {
            /**
             * @param searchFilter type JSON{}
             * @return: Array[ ] Publicacion
             */
            return $resource(
              '/user-action/search'
            ).get(searchFilter).$promise;

          };


        }
    ]
);
