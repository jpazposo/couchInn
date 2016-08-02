"use strict";
angular.module('misSolicitudes').controller(
  'misSolicitudesController',
  [
    '$scope',
    'couchinnService',
    '$location',
    '$mdDialog',
    function ($scope, couchinnService, $location, $mdDialog) {
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

      $scope.modificar = function (idx) {
        var application_to_modified = $scope.applications[idx];
        console.log('se va a setear la solisitud a modificar:-----------');
        console.log(JSON.stringify(application_to_modified));
        couchinnService.setApplication(application_to_modified)
        .then(function (application) {
           console.log('successfull set application : ----------------');
           console.log(JSON.stringify(application));
           $mdDialog.show(
             $mdDialog.alert()
                .parent(angular.element(document.querySelector('#popupContainer')))
                .clickOutsideToClose(true)
                .title('Modificacion de publicacion exitosa ')
                .textContent('Se va a modificar la solicitud de la publicacion: ' + application.lodgin.nombre)
                .ariaLabel('Alert Dialog Demo')
                 .ok('Continuar')
           );
           $location.path('/actualizar-solisitud');
           });



      };



    }
  ]
);
