"use strict";
angular.module('lodgin').controller(
    'lodgingController',
    [
      $scope.tipos = [
        'casa',
        'habitacion',
      ];
      $scope.addTipo = function(){
        $scope.tipos.push({title: 'un nuevo tipo!'});
      };
    ]
);
