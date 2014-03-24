var mongoose = require('mongoose'),
        crypto = require('crypto');


module.exports = function () {

    var EventSchema = new mongoose.Schema({
        eventName: { type:String, required:true},
        eventDescription: {type:String},
        eventDate: { type:Date, required:true},
        eventTime: { type:String},
        eventAddressLine1: { type:String},
        eventAddressLine2: { type:String},
        eventZipCode: { type:int},
        eventOrganizedBy:{type:String},
        eventCreatorName:{type:String, required:true},
        eventCreatorId:{type:String, required:true},
        eventCreatedDate:{type:Date, required:true}
    });

    return mongoose.model('Event', EventSchema);

}
