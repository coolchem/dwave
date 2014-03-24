'use strict';

angular.module('login', []);
angular.module('login')
        .controller('LoginController',['$scope','$rootScope','$location','User',function ($scope,$rootScope,$location, User)
{


    $scope.$location = $location;
    $scope.user = $rootScope.user;

    $scope.newUser = {};


    $scope.registeringUser = {};

    $scope.passwordsDoNotMatch = false;

    $scope.passwordNotEntered = false;

    $scope.login = function(){

        User.login($scope.user).$promise.then(function(promise) {
            if(promise)
            {
                $rootScope.user = promise;
                $rootScope.isUserLoggedin = true;

                $location.path('/events');

            }
            else
            {
                $rootScope.user = {};
            }
        });

    };

    $scope.register = function(newUser){

        User.register(newUser).$promise.then(function(promise) {
            if(promise)
            {
                $rootScope.user = promise;
                $rootScope.isUserLoggedin = true;

                $location.path('/events');

            }
            else
            {
                $rootScope.user = {};
            }
        });

    };

    $scope.isUnchanged = function(newUser) {
        return angular.equals(newUser, $scope.registeringUser);
    };


}]);





