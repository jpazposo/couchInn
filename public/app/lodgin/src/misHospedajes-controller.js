/**
 * Created by luciano on 15/07/16.
 */
"use strict";
angular.module('lodgin').controller(
  'misHospedajesController',
  [
    '$scope',
    'couchinnService',
    '$location',
    '$mdDialog',

    function ($scope, couchinnService, $location, $mdDialog) {


      $scope.user = couchinnService.getUser();
      if (!$scope.user) $location.url('/login');


      couchinnService.getMisHospedajes($scope.user)
        .then(function (lodgins) {
          $scope.lodgins = lodgins;
        });

      $scope.detalle = function (idx) {
        var lodgin_to_show = $scope.lodgins[idx];
        console.log('se va a setear la publicacion que se va a mostrat:-----------');
        console.log(JSON.stringify(lodgin_to_show));
        couchinnService.setLodgin(lodgin_to_show)
        $location.path('/detallar-publicacion');

      };

    }
  ]
);
