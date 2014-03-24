'use strict';

angular.module('contactus', []);
angular.module('contactus')
        .controller('ContactUsController',['$scope','$rootScope',function ($scope,$rootScope)
{

    $scope.user = $rootScope.user;


}] );





