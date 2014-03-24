
var eventService = angular.module('services.eventService', ['ngResource']);
eventService.factory('Events',['$resource',function ($resource)
{

    return $resource('/events/:eventController', {
                eventController: "@eventController"
            },
            {
                createEvent: {
                    method: "post",
                    params: {
                        eventController: "create"
                    }
                }
            });

}] );