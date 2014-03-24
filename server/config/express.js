/**
 * Module dependencies.
 */
var express = require('express'),
    mongoStore = require('connect-mongo')(express),
    config = require('./config');
var path = require('path');

module.exports = function(app, passport) {
    app.set('showStackError', true);


    //Setting the fav icon and static folder
    app.use(express.favicon());
    app.use(express.static(path.resolve(config.root, config.app.public)));


    //Don't use logger for test env
    if (process.env.NODE_ENV !== 'test') {
        app.use(express.logger('dev'));
    }

    //Enable jsonp
    app.enable("jsonp callback");

    app.configure(function() {
        //cookieParser should be above session
        app.use(express.cookieParser());

        //bodyParser should be above methodOverride
        app.use(express.bodyParser());
        app.use(express.methodOverride());

        //express/mongo session storage
        app.use(express.session({
            secret: 'DWAVE',
            store: new mongoStore({
                url: config.db,
                collection: 'sessions'
            })
        }));

        //use passport session
        app.use(passport.initialize());
        app.use(passport.session());


    });
};