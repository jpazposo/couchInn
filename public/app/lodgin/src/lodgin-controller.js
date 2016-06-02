"use strict";
angular.module('lodgin').controller(
  'lodgingController',
  [
    '$scope',
    function ($scope) {
      $scope.tipos = [
        'casa',
        'habitacion'
      ];


      $scope.addTipo = function () {
        $scope.tipos.push({title: 'un nuevo tipo!'});
      };
    }

  ]
);
