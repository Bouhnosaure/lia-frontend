'use strict';

/**
 * @ngdoc service
 * @name liaFrontendApp.users
 * @description
 * # users
 * Service in the liaFrontendApp.
 */
angular.module('liaFrontendApp')
  .service('Users', function (ConfigData, $log, $http) {

    //http://api.couchdb.ovh/users/settings
    this.getSettings = function () {
      $log.debug('users service - getSettings');
      return $http.get(ConfigData.api_endpoint + 'users/settings')
    };

    this.setSettings = function (data) {
      $log.debug('users service - setSettings');
      return $http.post(ConfigData.api_endpoint + "users/settings", data);
    };

  });
