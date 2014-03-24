/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    config = require('../../config/config'),
    Schema = mongoose.Schema;


/**
 * Article Schema
 */
var EventSchema = new Schema({
    name: {
        type: String,
        default: '',
        trim: true
    },
    description: {
        type: String,
        default: '',
        trim: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    location: {
        type: String,
        default: '',
        trim: true
    },
    address1: {
        type: String,
        default: '',
        trim: true
    },
    address2: {
        type: String,
        default: '',
        trim: true
    },
    zip: {
        type: Number,
        default: '',
        trim: true
    },
    city: {
        type: String,
        default: '',
        trim: true
    },
    createdDate: {
        type: Date,
        default: Date.now
    },
    owner: {
        type: Schema.ObjectId,
        ref:'User'
    }
});

/**
 * Validations
 */
EventSchema.path('name').validate(function(name) {
    return name.length;
}, 'name cannot be blank');

mongoose.model('Event', EventSchema);