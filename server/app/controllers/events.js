/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    async = require('async'),
    Event = mongoose.model('Event'),
    _ = require('underscore');


/**
 * Find article by id
 */
exports.event = function(req, res, next, id) {
    Event.load(id, function(err, event) {
        if (err) return next(err);
        if (!event) return next(new Error('Failed to load event ' + id));
        req.event = event;
        next();
    });
};

/**
 * Create a article
 */
exports.create = function(req, res, next) {
    var event = new Event(req.body);
    event.owner = req.user.id;

    event.save(function(err, results) {
        if (err) {
            return next(err);
        } 
        else {
            return res.send(results);
        }
    });
};

/**
 * Update a event
 */
exports.update = function(req, res) {
    var event = req.event;

    event = _.extend(event, req.body);

    event.save(function(err) {
        res.jsonp(event);
    });
};

/**
 * Delete an article
 */
exports.destroy = function(req, res, next) {
    var event = req.event;

    event.remove(function(err , results) {
        if (err) {
            return next(err);
        } else {
            return res.send(results);
        }
    });
};

/**
 * Show an article
 */
exports.show = function(req, res) {
    res.jsonp(req.event);
};

/**
 * List of Articles
 */
exports.all = function(req, res, next) {
    Event.find().sort('-createdDate').populate('owner').exec(function(err, events) {
        if (err) {
            next(err);
        } else {
            res.jsonp(events);
        }
    });
};
