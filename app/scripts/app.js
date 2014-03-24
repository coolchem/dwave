'use strict';

var app = angular.module('dwaveApp', ['ngRoute', 'ngAnimate', 'route-segment', 'view-segment',
 'main',
 'home',
'events',
'login',
'aboutus',
'contactus',
'services.eventService',
'services.userService'

]);

app.config(['$routeSegmentProvider','$routeProvider',function($routeSegmentProvider, $routeProvider) {

    // Configuring provider options

    $routeSegmentProvider.options.autoLoadTemplates = true;

    // Setting routes. This consists of two parts:
    // 1. `when` is similar to vanilla $route `when` but takes segment name instead of params hash
    // 2. traversing through segment tree to set it up

    $routeSegmentProvider

            .when('/home',          'home')
            .when('/events',    'events.eventsList')
            .when('/contacts',      'contacts')
            .when('/about',    'about')
            .when('/login',    'login')
            .when('/register',    'register')
            .when('/events/create', 'events.create')
            .when('/events/myevents', 'events.myevents')

            .segment('home', {
                templateUrl: '/views/home.html',
                controller: 'HomeController'})
            .segment('events', {
                templateUrl: '/views/events.html',
                controller: 'EventController'})
            .within()
            .segment('eventsList', {
                templateUrl: '/views/events/eventsList.html',
                controller: 'EventListController',
                resolve: {
                    currentEvents: ['Events',function(Events) {

                        return Events.query().$promise;
                    }]
                }})

            .segment('create', {
                templateUrl: '/views/events/createEvent.html',
                controller: 'CreateEventController'})
            .segment('myevents', {
                templateUrl: '/views/events/eventsList.html',
                controller: 'MyEventsController'})

            .up()
            .segment('contacts', {
                templateUrl: '/views/contactus.html',
                controller: 'ContactUsController'})
            .segment('about', {
                templateUrl: '/views/aboutus.html',
                controller: 'AboutUsController'})
            .segment('login', {
                templateUrl: '/views/login.html',
                controller: 'LoginController'})
            .segment('register', {
                templateUrl: '/views/register.html',
                controller: 'LoginController'});



    $routeProvider.otherwise({redirectTo: '/home'});
}]);
