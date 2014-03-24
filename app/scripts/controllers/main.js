'use strict';

angular.module('main', []);
angular.module('main')
        .controller('MainController',['$scope','$rootScope','$location','$routeSegment','User',function ($scope,$rootScope, $location, $routeSegment, User)
{

    $scope.$routeSegment = $routeSegment;
    $scope.$location = $location;

    $scope.$rootScope = $rootScope;

    $rootScope.user = {};
    $rootScope.isUserLoggedin = false;

    User.get().$promise.then(function(promise) {
        if(promise)
        {
            $rootScope.user = promise;
            $rootScope.isUserLoggedin = true;


        }
        else
        {
            $rootScope.user = {};
            $rootScope.isUserLoggedin = false;
        }
    });

    $scope.logout = function(){

        User.logout().$promise.then(function(promise) {

            resetMyEvents();
            if (promise) {

                $rootScope.user = {};
                $rootScope.isUserLoggedin = false;

            }
            else
            {
                $rootScope.user = {};
                $rootScope.isUserLoggedin = false;
            }


        });

    };

    $scope.$on('routeSegmentChange', function() {
    });

    function resetMyEvents(){


        if($rootScope.user && $rootScope.user.events)
        {
            var length = $rootScope.events.length;
            var event = null;

            for (var i = 0; i < length; i++) {
                event = $rootScope.events[i];
                event.isMyEvent = false;
            }
        }
    }


}]);





