'use strict';

angular.module('events', []);
angular.module('events')
        .controller('EventController',['$scope','$rootScope','$location','$routeSegment', function ($scope, $rootScope, $location, $routeSegment) {

    $scope.$rootScope = $rootScope;
    $scope.$location = $location;
    $scope.$routeSegment = $routeSegment;


}])
        .controller('EventListController',['$scope','$rootScope','$location','$routeSegment','currentEvents','User',function ($scope, $rootScope, $location, $routeSegment,currentEvents, User) {

    $scope.$rootScope = $rootScope;
    $scope.$location = $location;
    $scope.$routeSegment = $routeSegment;
    $rootScope.events = currentEvents;
    $scope.events = $rootScope.events;
    $scope.isMyEvents = false;

    $scope.newEvent = {};

    $scope.addEvent = function (event) {

        if($rootScope.isUserLoggedin)
        {
            User.addEvent(event).$promise.then(function (promise) {
                if (promise) {

                    $rootScope.user.events.push(event);
                    setMyEvents();

                }
            });
        }
        else
        {
            $rootScope.pendingAddEvent = event;
            $location.path('/login');
        }

    };

    $scope.removeEvent = function (event) {

        User.removeEvent(event).$promise.then(function (promise) {
            if (promise) {

                //$rootScope.user.events.pop(event);
                var i = $rootScope.user.events.indexOf(event);
                $rootScope.user.events.splice(i, 1);
                setMyEvents();

            }
        });

    };


    if($rootScope.pendingAddEvent)
    {
        $scope.addEvent($rootScope.pendingAddEvent);
        $rootScope.pendingAddEvent = null;
    }
    else
    {
        setMyEvents();
    }



    function setMyEvents(){


        if($rootScope.user && $rootScope.user.events)
        {
            var length = $rootScope.events.length;
            var event = null;

            for (var i = 0; i < length; i++) {
                event = $rootScope.events[i];
                event.isMyEvent = false;

                for (var j = 0; j < $rootScope.user.events.length; j++) {
                    var myEvent = $rootScope.user.events[j];

                    if(myEvent._id == event._id)
                    {
                        event.isMyEvent = true;
                        break;
                    }
                }
            }
        }
    }


}]).controller('MyEventsController',['$scope','$rootScope','$location','$routeSegment','User',function ($scope, $rootScope, $location, $routeSegment,User) {

    $scope.$rootScope = $rootScope;
    $scope.$location = $location;
    $scope.$routeSegment = $routeSegment;
    $scope.isMyEvents = true;
    $scope.events = $rootScope.user.events;

    setMyEvents();


    $scope.removeEvent = function (event) {

            User.removeEvent(event).$promise.then(function (promise) {
                if (promise) {

                    //$rootScope.user.events.pop(event);
                    var i = $rootScope.user.events.indexOf(event);
                    $rootScope.user.events.splice(i, 1);
                    setMyEvents();

                }
            });

    };




    function setMyEvents(){

        var length = $rootScope.user.events.length,
                myEvent = null;
        for (var i = 0; i < length; i++) {
            myEvent = $rootScope.user.events[i];

            myEvent.isMyEvent = true;
        }
    }





}]).controller('CreateEventController',['$scope','$rootScope','$location','$routeSegment','Events',function ($scope, $rootScope, $location, $routeSegment, Events) {

    $scope.$rootScope = $rootScope;
    $scope.$location = $location;
    $scope.$routeSegment = $routeSegment;

    $scope.newEvent = {};


    $scope.createEvent = function () {


        Events.createEvent($scope.newEvent).$promise.then(function (promise) {
            if (promise) {
                Events.query().$promise.then(function (promise) {

                    $rootScope.events = promise;

                    $location.path('/events');

                });
            }
        });
    };


}] );





