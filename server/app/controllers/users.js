/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    User = mongoose.model('User'),
        Event = mongoose.model('Event');

    exports.getCurrent =
        function (req, res, next) {
            if (!req.user) {
                res.send(400);
            }
            else {
                User.findOne({_id: req.user.id}).populate('events').exec(function (err, results) {
                    if (err) return next(err);
                    if (results) {
                        console.log({username: results.username});
                        res.send(results);
                    }
                    else {
                        res.send(400);
                    }
                });
            }
        };

    exports.authenticate =
        function (req, res, next, passport) {
            passport.authenticate('local', function (err, user, info) {
                if (err) return next(err);
                if (!user) {
                    res.send('Invalid username or password.', 400);
                }
                req.logIn(user, function (err) {

                    if (err) return next(err);

                    User.findOne({_id: user.id}).populate('events').exec(function (err, results) {
                        if (err) return next(err);
                        if (results) {
                            console.log({username: results.username});
                            res.send(results);
                        }
                        else {
                            res.send(400);
                        }
                    });
                });
            })(req, res, next);
        };

    exports.create =
        function (req, res, next) {
            var user = new User(req.body);
            User.findOne({username: user.username}, function (err, results) {
                if (err) return next(err);
                if (results) {
                    res.send('A user with this username already exists.', 400);
                }
                else {
                    user.save(function (err, results) {
                        if (err) return next(err);
                        req.logIn(user, function () {
                            res.send(results);
                        });
                    });
                }
            })
        };

exports.addEvent = function(req, res, next) {

    var user = req.user;
    var event = new Event(req.body);

    user.events.push(event);

    user.save(function(err, results) {
        if (err) {
            return next(err);
        }
        else {
            return res.send('ok', 200);
        }
    });
};

exports.removeEvent = function(req, res, next) {

    var user = req.user;
    var event = new Event(req.body);

    user.events.remove(event.id);

    user.save(function(err, results) {
        if (err) {
            return next(err);
        }
        else {
            return res.send('ok', 200);
        }
    });
};


    //logout/kill session
    exports.kill =
        function (req, res) {
            if (req.session) {
                req.session.destroy(function () {
                    res.send('ok', 200);
                });
            }
            else {
                res.send('ok', 200);
            }
        };
