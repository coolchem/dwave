'use strict';

angular.module('aboutus', []);
angular.module('aboutus')
        .controller('AboutUsController',['$scope','$rootScope',function ($scope,$rootScope)
{

    $scope.user = $rootScope.user;


}] );





