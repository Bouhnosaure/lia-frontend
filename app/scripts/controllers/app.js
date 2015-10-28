'use strict';

/**
 * @ngdoc function
 * @name liaFrontendApp.controller:AppCtrl
 * @description
 * # AppCtrl
 * Controller of the liaFrontendApp
 */
angular.module('liaFrontendApp')
  .controller('AppCtrl', function ($rootScope, $scope, $log, $window, JqueryCoreService) {
    $log.debug('AppCtrl - initialize');

    $log.debug('AppCtrl - JqueryCoreService initialize');
    JqueryCoreService.initialize();
  });
