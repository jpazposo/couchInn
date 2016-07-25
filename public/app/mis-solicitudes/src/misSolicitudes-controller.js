"use strict";
angular.module('misSolicitudes').controller(
  'misSolicitudesController',
  [
    '$scope',
    'couchinnService',
    '$location',
    function ($scope, couchinnService, $location) {
      console.log('se cargó el controller misSolicitudesController');

      $scope.user = couchinnService.getUser();
      console.log($scope.user);

      if (!$scope.user) $location.url('/login');

      couchinnService.getApplications($scope.user)
        .then((applications)=>{
          $scope.applications = applications;
        })
        .catch((err)=>{

        });





    }
  ]
);
