var userService = angular.module('services.userService', ['ngResource']);
userService.factory('User',['$resource',function ($resource)
{

    return $resource('/user/:userController', {
                userController: "@userController"
            },
            {
                login: {
                    method: "GET",
                    params: {
                        userController: "login"
                    }
                },
                register: {
                    method: "POST",
                    params: {
                        userController: "register"
                    }
                },
                logout: {
                    method: "POST",
                    params: {
                        userController: "logout"
                    }
                },
                addEvent: {
                    method: "POST",
                    params: {
                        userController: "addevent"
                    }
                },
                removeEvent: {
                    method: "POST",
                    params: {
                        userController: "removeevent"
                    }
                }
            });

}] );


userService.service('UserService',function (User)
{


});