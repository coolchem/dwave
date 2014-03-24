angular.module('appHttpInterceptor', [])

    .config(function($httpProvider) {
      $httpProvider.responseInterceptors.push('httpInterceptor');
    })

    .factory('httpInterceptor', function($q, $rootScope, $location) {
      var activeRequests = 0;
      var started = function() {
        if(activeRequests==0) {
          $rootScope.$broadcast('loadingStatusActive');
        }
        activeRequests++;
      };
      var ended = function() {
        activeRequests--;
        if(activeRequests==0) {
          $rootScope.$broadcast('loadingStatusInactive');
        }
      };
      return {
        request: function(config) {
          started();
          return config || $q.when(config);
        },
        response: function(response) {
          ended();
          return response || $q.when(response);
        },
        responseError: function(rejection) {
          ended();
          var status = rejection.status;
          if (status == 401 || status == 500 || status == 501 ) {
            $rootScope.redirect = $location.url(); // save the current url so we can redirect the user back
            $rootScope.user.reset();
            $location.path('/login');
          }
          return $q.reject(rejection);
        }
      };
    });