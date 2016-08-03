"use strict";
angular.module('lodgin').controller(
  'editSolicitudController',
  [
    '$scope',
    'couchinnService',
    '$location',
    '$mdDialog',
    function ($scope, couchinnService, $location, $mdDialog) {
      $scope.user = couchinnService.getUser();
      console.log('se cargó el controller editSolicitudController');
      $scope.application = couchinnService.getSolicitud();
      console.log($scope.application);
      $scope.application.fechaInicio = new Date($scope.application.fechaInicio);
      $scope.application.fechaFin = new Date($scope.application.fechaFin);
      $scope.lodgin = $scope.application.lodgin
      $scope.lodgin.fechaInicio = new Date($scope.lodgin.fechaInicio);
      $scope.lodgin.fechaFin = new Date($scope.lodgin.fechaFin);


      if (!$scope.user || $scope.user.username != $scope.lodgin.user.username) {
        $scope.notMyCouch = true;
      }
      else {
        $scope.notMyCouch = false;
      }

      $scope.solicitar = function (idx) {

        if (!$scope.user) {
          $location.url('/#login');
          return;
        }

        if ($scope.lodgin.activa == "NO") {
          $mdDialog.show(
            $mdDialog.alert()
              .parent(angular.element(document.querySelector('#popupContainer')))
              .clickOutsideToClose(true)
              .title('Publicacion Anulada!! ')
              .textContent('Para poder realizar una Solicitud la Publicacion debe estar activa')
              .ariaLabel('Alert Dialog Demo')
              .ok('Continuar')
          );
          return;
        }

        if (!validateDates()) {
          $mdDialog.show(
            $mdDialog.alert()
              .parent(angular.element(document.querySelector('#popupContainer')))
              .clickOutsideToClose(true)
              .title('Fecha No disponible ')
              .textContent('Revise las fechas que tiene disponible')
              .ariaLabel('Alert Dialog Demo')
              .ok('Continuar')
          );
          return;
        }

        couchinnService.modificarSolicitud($scope.application)
          .then(function(lodgin) {
          $mdDialog.show(
          $mdDialog.alert()
            .parent(angular.element(document.querySelector('#popupContainer')))
            .clickOutsideToClose(true)
            .title('Felicitaciones, acabas de reservar este couch')
            .textContent('Un email será enviado a ' + $scope.user.username + ' detallando todos los datos de la reserva')
            .ariaLabel('Alert Dialog Demo')
            .ok('Seguir buscando otros couch')
        );
        $location.path('/user-logged/' + $scope.user.nombre);
      })
        .
        catch(function(err) {
          $mdDialog.show(
          $mdDialog.alert()
            .parent(angular.element(document.querySelector('#popupContainer')))
            .clickOutsideToClose(true)
            .title('Hubo un error intentando solicitar este couch')
            .textContent('Un email será enviado a ' + $scope.user.username + ' detallando el error')
            .ariaLabel('Alert Dialog Demo')
            .ok('reintentar')
        );
      });

      };

      var validateDates = function () {
        /*
         * @return Boolean
         */
        var result = true;

        var slectedRange = moment.range($scope.application.fechaInicio, $scope.application.fechaFin);

        $scope.lodgin.fechasReservadas
          .forEach(function (fechas) {
            var start = new Date(fechas.fechaInicio);
            var end = new Date(fechas.fechaFin);

            var unavailableRange = moment.range(start, end);

            if (slectedRange.overlaps(unavailableRange)) {
              result = false;
            }

          });

        return result;


      };


    }

  ]
);
