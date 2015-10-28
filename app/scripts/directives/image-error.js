'use strict';

/**
 * @ngdoc directive
 * @name liaFrontendApp.directive:daterangeSelect
 * @description
 * # liaFrontendApp
 */
angular.module('liaFrontendApp')
  .directive('img', function () {
    return {
      restrict: 'E',
      link: function (scope, element, attrs) {
        // show an image-missing image
        element.error(function () {
          var w = element.width();
          var h = element.height();
          // using 20 here because it seems even a missing image will have ~18px width
          // after this error function has been called
          if (w <= 20) {
            w = 100;
          }
          if (h <= 20) {
            h = 100;
          }
          var url = 'http://placehold.it/' + w + 'x' + h + '/cccccc/ffffff';
          element.prop('src', url);
          element.css('border', 'double 3px #cccccc');
        });
      }
    }
  });
