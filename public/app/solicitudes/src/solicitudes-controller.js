"use strict";
angular.module('solicitudes').controller(
    'solicitudesController',
    [
        '$scope',
        'buscarService',
        'couchinnService',
        '$mdDialog',
        function ($scope, buscarService, couchinnService, $mdDialog) {
          console.log('se cargó el controller solicitudesController');

          $scope.query = {};

          $scope.find = function (query) {
            couchinnService.getApplicationByRange(query)
              .then(function (applications) {
                $scope.applications = applications;
                if ($scope.applications.length == 0){
                  $mdDialog.show(
                    $mdDialog.alert()
                      .parent(angular.element(document.querySelector('#popupContainer')))
                      .clickOutsideToClose(true)
                      .title('Búsqueda sin éxito ')
                      .textContent('Amplíe el rango de fechas para obtener resultados')
                      .ariaLabel('Alert Dialog Demo')
                      .ok('Continuar')
                  );
                }
              })
              .catch(function (err) {
                $mdDialog.show(
                  $mdDialog.alert()
                    .parent(angular.element(document.querySelector('#popupContainer')))
                    .clickOutsideToClose(true)
                    .title('Búsqueda sin éxito ')
                    .textContent('Hubo un error que produjo que esta búsqueda no funcionara, error: ' + JSON.stringify(err))
                    .ariaLabel('Alert Dialog Demo')
                    .ok('Continuar')
                );
              })
          };

        }
    ]
);
