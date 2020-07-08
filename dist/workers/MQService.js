//import amqp from 'amqplib/callback_api';
//
//
//const CONN_URL = 'amqp://admin:74626731@localhost:15672';
//
//
//let ch = null;
//amqp.connect(CONN_URL, function (err, conn) {
//  conn.createChannel(function (err, channel) {
//    ch = channel;
//  });
//});
//
//
//export const publishToQueue = async (queueName, data) => {
//  ch.sendToQueue(queueName, new Buffer(data));
//}
//process.on('exit', (code) => {
//  ch.close();
//  console.log(`Closing rabbitmq channel`);
//});
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TAG = "[AMQP]";
var WorkersMQ = /** @class */ (function () {
    function WorkersMQ() {
        this.amqp = require('amqplib');
        this.q_sms = 'sms';
        this.q_notif = 'notif';
        this.q_email = 'email';
        this.q_challenge = 'challenge';
        this.open = this.amqp.connect(process.env.RABBITMQ_URL || 'amqp://localhost');
    }
    Object.defineProperty(WorkersMQ.prototype, "Q_SMS", {
        get: function () {
            return "sms";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WorkersMQ.prototype, "Q_NOTIF", {
        get: function () {
            return "notif";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WorkersMQ.prototype, "Q_EMAIL", {
        get: function () {
            return "email";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WorkersMQ.prototype, "Q_EXEC", {
        get: function () {
            return "executor";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WorkersMQ.prototype, "Q_CHALLENGE", {
        get: function () {
            return "challenge";
        },
        enumerable: true,
        configurable: true
    });
    WorkersMQ.prototype.bail = function (err) {
        console.error(err);
        process.exit(1);
    };
    WorkersMQ.prototype.publish = function (q, message) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.open.then(function (conn) {
                return conn.createChannel();
            }).then(function (ch) {
                return ch.assertQueue(q).then(function (ok) {
                    var ok2 = ch.sendToQueue(q, Buffer.from(JSON.stringify(message)), { persistent: false });
                    resolve(true);
                }).catch(function (err) {
                    reject(err);
                });
            }).catch(function (err) {
                reject(err);
            });
        });
    };
    WorkersMQ.prototype.consume = function (q, callback) {
        console.log('====================*******************omad*************##########################');
        this.open.then(function (conn) {
            return conn.createChannel();
        }).then(function (ch) {
            return ch.assertQueue(q).then(function (ok) {
                return ch.consume(q, function (msg) {
                    callback(msg, ch);
                });
            });
        }).catch(console.warn);
    };
    return WorkersMQ;
}());
exports.default = WorkersMQ;
//# sourceMappingURL=MQService.js.map