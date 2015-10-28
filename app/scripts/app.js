'use strict';

/**
 * @ngdoc overview
 * @name liaFrontendApp
 * @description
 * # liaFrontendApp
 *
 * Main module of the application.
 */

angular
  .module('liaFrontendApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ui.router',
    'ngSanitize',
    'ngTouch',
    'satellizer',
    'angular-loading-bar',
    'ngBootstrap',
    'ui.bootstrap',
    'toastr',
    'LocalStorageModule',
    'angularMoment',
    'ngFileUpload',
    'ngDialog'
  ])

  .constant('ConfigData', {
    'api_endpoint': 'http://lia-api.dev/'
  })

  .constant('angularMomentConfig', {
    timezone: 'Europe/Paris'
  })

  .run(function ($rootScope, $window, $auth, $location, $state, $log) {
    $rootScope.$on("$stateChangeStart", function (event, toState) {
      $log.debug('check auth status');
      if (toState.authenticated && (!$auth.isAuthenticated() || $auth.getPayload().exp >= Date.now() || $auth.getPayload() === undefined)) {
        $rootScope = $rootScope.$new(true);
        $window.localStorage.clear();
        $log.debug('cannot be authenticated - destroy localstorage');
        $log.debug('not authenticated - redirect to login');
        $state.go('login');
        event.preventDefault();
      } else {
        if ($rootScope.currentUser === undefined) {
          $rootScope.currentUser = JSON.parse($window.localStorage.currentUser);
          $log.debug('authenticated - save user data to rootscope');
        }
      }
    });

    $rootScope.goBack = function () {
      $window.history.back();
    };


    $rootScope.jqueryDebugEnabled = false;
  })

  .config(function ($logProvider) {
    $logProvider.debugEnabled(true);
  })

  .config(function (localStorageServiceProvider) {
    localStorageServiceProvider.setStorageType('localStorage');
  })

  .config(['cfpLoadingBarProvider', function (cfpLoadingBarProvider) {
    cfpLoadingBarProvider.includeSpinner = false;
    cfpLoadingBarProvider.latencyThreshold = 100;
  }])


  .config(['ngDialogProvider', function (ngDialogProvider) {
    ngDialogProvider.setDefaults({
      className: 'ngdialog-theme-default',
      plain: false,
      showClose: false,
      closeByDocument: true,
      closeByEscape: true
    });
  }])


  .config(function ($stateProvider, $urlRouterProvider, $authProvider, $httpProvider, ConfigData) {
    $stateProvider

      //Auth Login
      .state('login', {
        url: "/login",
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl',
        onEnter: function ($rootScope) {
          $rootScope.bodyClass = "texture";
        },
        onExit: function ($rootScope) {
          $rootScope.bodyClass = "";
        }
      })

      .state('logout', {
        url: "/logout",
        template: null,
        controller: 'LogoutCtrl'
      })

      //Main Layout
      .state('app', {
        url: "/app",
        abstract: true,
        templateUrl: 'views/app.html',
        controller: 'AppCtrl',
        authenticated: true
      })
      .state('app.home', {
        url: "/home",
        templateUrl: 'views/home.html',
        controller: 'HomeCtrl',
        authenticated: true
      })

      .state('app.about', {
        url: "/about",
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        authenticated: true
      });


    $urlRouterProvider.otherwise("/app/home");

    $authProvider.loginUrl = ConfigData.api_endpoint + 'auth/signin';
    $authProvider.signupUrl = ConfigData.api_endpoint + 'auth/signup';
    $authProvider.tokenRoot = 'data';
    $authProvider.httpInterceptor = true;
    $authProvider.platform = 'browser';
    //$authProvider.authHeader = 'x-access-token';

  });
