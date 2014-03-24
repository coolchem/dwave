var async = require('async');

module.exports = function(app, passport, auth) {

    //User Routes
    var users = require('../app/controllers/users');
    app.get('/user', users.getCurrent);
    app.get('/user/login', function(req, res, next){
        users.authenticate(req, res, next, passport);

    });
    app.post('/user/register', users.create);
    app.post('/user/logout', users.kill);
    app.post('/user/addevent',auth.requiresLogin, users.addEvent);
    app.post('/user/removeevent',auth.requiresLogin, users.removeEvent);

    //Events
    var events = require('../app/controllers/events');
    app.get('/events', events.all);
    app.post('/events/create',auth.requiresLogin, events.create);
    //app.post('/events/remove',auth.requiresLogin, events.create);


};