"use strict";angular.module("main",[]),angular.module("main").controller("MainController",["$scope","$rootScope","$location","$routeSegment","User",function(a,b,c,d,e){function f(){if(b.user&&b.user.events)for(var a=b.events.length,c=null,d=0;a>d;d++)c=b.events[d],c.isMyEvent=!1}a.$routeSegment=d,a.$location=c,a.$rootScope=b,b.user={},b.isUserLoggedin=!1,e.get().$promise.then(function(a){a?(b.user=a,b.isUserLoggedin=!0):(b.user={},b.isUserLoggedin=!1)}),a.logout=function(){e.logout().$promise.then(function(a){f(),a?(b.user={},b.isUserLoggedin=!1):(b.user={},b.isUserLoggedin=!1)})},a.$on("routeSegmentChange",function(){})}]),angular.module("home",["services.eventService"]),angular.module("home").controller("HomeController",["$scope","$rootScope",function(){}]),angular.module("events",[]),angular.module("events").controller("EventController",["$scope","$rootScope","$location","$routeSegment",function(a,b,c,d){a.$rootScope=b,a.$location=c,a.$routeSegment=d}]).controller("EventListController",["$scope","$rootScope","$location","$routeSegment","currentEvents","User",function(a,b,c,d,e,f){function g(){if(b.user&&b.user.events)for(var a=b.events.length,c=null,d=0;a>d;d++){c=b.events[d],c.isMyEvent=!1;for(var e=0;e<b.user.events.length;e++){var f=b.user.events[e];if(f._id==c._id){c.isMyEvent=!0;break}}}}a.$rootScope=b,a.$location=c,a.$routeSegment=d,b.events=e,a.events=b.events,a.isMyEvents=!1,a.newEvent={},a.addEvent=function(a){b.isUserLoggedin?f.addEvent(a).$promise.then(function(c){c&&(b.user.events.push(a),g())}):(b.pendingAddEvent=a,c.path("/login"))},a.removeEvent=function(a){f.removeEvent(a).$promise.then(function(c){if(c){var d=b.user.events.indexOf(a);b.user.events.splice(d,1),g()}})},b.pendingAddEvent?(a.addEvent(b.pendingAddEvent),b.pendingAddEvent=null):g()}]).controller("MyEventsController",["$scope","$rootScope","$location","$routeSegment","User",function(a,b,c,d,e){function f(){for(var a=b.user.events.length,c=null,d=0;a>d;d++)c=b.user.events[d],c.isMyEvent=!0}a.$rootScope=b,a.$location=c,a.$routeSegment=d,a.isMyEvents=!0,a.events=b.user.events,f(),a.removeEvent=function(a){e.removeEvent(a).$promise.then(function(c){if(c){var d=b.user.events.indexOf(a);b.user.events.splice(d,1),f()}})}}]).controller("CreateEventController",["$scope","$rootScope","$location","$routeSegment","Events",function(a,b,c,d,e){a.$rootScope=b,a.$location=c,a.$routeSegment=d,a.newEvent={},a.createEvent=function(){e.createEvent(a.newEvent).$promise.then(function(a){a&&e.query().$promise.then(function(a){b.events=a,c.path("/events")})})}}]),angular.module("login",[]),angular.module("login").controller("LoginController",["$scope","$rootScope","$location","User",function(a,b,c,d){a.$location=c,a.user=b.user,a.newUser={},a.registeringUser={},a.passwordsDoNotMatch=!1,a.passwordNotEntered=!1,a.login=function(){d.login(a.user).$promise.then(function(a){a?(b.user=a,b.isUserLoggedin=!0,c.path("/events")):b.user={}})},a.register=function(a){d.register(a).$promise.then(function(a){a?(b.user=a,b.isUserLoggedin=!0,c.path("/events")):b.user={}})},a.isUnchanged=function(b){return angular.equals(b,a.registeringUser)}}]),angular.module("aboutus",[]),angular.module("aboutus").controller("AboutUsController",["$scope","$rootScope",function(a,b){a.user=b.user}]),angular.module("contactus",[]),angular.module("contactus").controller("ContactUsController",["$scope","$rootScope",function(a,b){a.user=b.user}]);var eventService=angular.module("services.eventService",["ngResource"]);eventService.factory("Events",["$resource",function(a){return a("/events/:eventController",{eventController:"@eventController"},{createEvent:{method:"post",params:{eventController:"create"}}})}]);var userService=angular.module("services.userService",["ngResource"]);userService.factory("User",["$resource",function(a){return a("/user/:userController",{userController:"@userController"},{login:{method:"GET",params:{userController:"login"}},register:{method:"POST",params:{userController:"register"}},logout:{method:"POST",params:{userController:"logout"}},addEvent:{method:"POST",params:{userController:"addevent"}},removeEvent:{method:"POST",params:{userController:"removeevent"}}})}]),userService.service("UserService",["User",function(){}]),angular.module("appHttpInterceptor",[]).config(["$httpProvider",function(a){a.responseInterceptors.push("httpInterceptor")}]).factory("httpInterceptor",["$q","$rootScope","$location",function(a,b,c){var d=0,e=function(){0==d&&b.$broadcast("loadingStatusActive"),d++},f=function(){d--,0==d&&b.$broadcast("loadingStatusInactive")};return{request:function(b){return e(),b||a.when(b)},response:function(b){return f(),b||a.when(b)},responseError:function(d){f();var e=d.status;return(401==e||500==e||501==e)&&(b.redirect=c.url(),b.user.reset(),c.path("/login")),a.reject(d)}}}]);var app=angular.module("dwaveApp",["ngRoute","ngAnimate","route-segment","view-segment","main","home","events","login","aboutus","contactus","services.eventService","services.userService"]);app.config(["$routeSegmentProvider","$routeProvider",function(a,b){a.options.autoLoadTemplates=!0,a.when("/home","home").when("/events","events.eventsList").when("/contacts","contacts").when("/about","about").when("/login","login").when("/register","register").when("/events/create","events.create").when("/events/myevents","events.myevents").segment("home",{templateUrl:"/views/home.html",controller:"HomeController"}).segment("events",{templateUrl:"/views/events.html",controller:"EventController"}).within().segment("eventsList",{templateUrl:"/views/events/eventsList.html",controller:"EventListController",resolve:{currentEvents:["Events",function(a){return a.query().$promise}]}}).segment("create",{templateUrl:"/views/events/createEvent.html",controller:"CreateEventController"}).segment("myevents",{templateUrl:"/views/events/eventsList.html",controller:"MyEventsController"}).up().segment("contacts",{templateUrl:"/views/contactus.html",controller:"ContactUsController"}).segment("about",{templateUrl:"/views/aboutus.html",controller:"AboutUsController"}).segment("login",{templateUrl:"/views/login.html",controller:"LoginController"}).segment("register",{templateUrl:"/views/register.html",controller:"LoginController"}),b.otherwise({redirectTo:"/home"})}]);