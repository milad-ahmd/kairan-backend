"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TAG = "[smsWorker]";
var mongoose = require("mongoose");
var MQService_1 = require("./MQService");
var mq = new MQService_1.default();
mq.consume(mq.Q_SMS, function (msg, ch) {
    console.log('====================*******************omad*************##########################');
    var mongodbURI;
    mongodbURI = 'mongodb://localhost:27017/porpaa';
    mongoose.Promise = global.Promise;
    var mongodb = mongoose.connect(mongodbURI);
    mongodb
        .then(function (db) {
        console.log('Connected to MongoDB');
        try {
            var msg_obj = JSON.parse(msg.content.toString());
            console.log(msg_obj, new Date().getTime());
            switch (msg_obj.type) {
                case "ticket_user":
                    try {
                        console.log('====================*******************omad*************##########################');
                    }
                    catch (err) {
                        console.error(err);
                    }
                    break;
                case "ticket_provider":
                    break;
                default:
                //                      emailUtil.send(msg_obj.receivers, msg_obj.subject, msg_obj.body, msg_obj.attachments).then(result => {
                //                          console.log(TAG, result);
                //                      }).catch(err => {
                //                          console.log(TAG, err);
                //                      });
            }
        }
        catch (err) {
            console.error(TAG, err);
        }
    })
        .catch(function (err) {
        console.error(err);
    });
    ch.ack(msg);
});
console.log(TAG, "started");
//# sourceMappingURL=smsWorker.js.map