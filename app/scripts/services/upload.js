'use strict';

/**
 * @ngdoc service
 * @name liaFrontendApp.upload
 * @description
 * # upload
 * Service in the bziiitApp.
 */
angular.module('liaFrontendApp')
  .service('UploadService', function ($http, $log, ConfigData, Upload) {

    this.submitImage = function (image, id) {
      $log.debug('upload service - submitImageToEstablishment');

      return Upload.upload({
        url: ConfigData.api_endpoint + "establishments/image/" + id,
        file: image,
        fileFormDataName: 'image',
      }).progress(function (evt) {
        var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
        $log.debug('progress: ' + progressPercentage + '% ' + evt.config.file.name);
      }).success(function (data, status, headers, config) {
        $log.debug('file ' + config.file.name + 'uploaded. Response: ' + data);
      }).error(function (data, status, headers, config) {
        $log.debug('error status: ' + status);
      })
    };


  });
