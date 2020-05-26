"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
// var fs = require("fs");
// var path = require("path");
var fs = require("fs");
var path = require("path");
var image_1 = require("../models/image");
var base_1 = require("./base");
var Throttle = require("stream-throttle").Throttle;
var UploadCtrl = /** @class */ (function (_super) {
    __extends(UploadCtrl, _super);
    function UploadCtrl() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.model = image_1.default;
        _this.upload = function (req, res) {
            var fileName = "sanay_" + Date.now() + ".jpg";
            try {
                // process.env.IMAGE_UPLOAD_DIR
                var out_1 = path.join(__dirname, '../images', fileName);
                // throttle write speed to 4MB/s
                return new Promise(function (resolve, reject) {
                    req.pipe(new Throttle({ rate: 1024 * 4096 }))
                        .pipe(fs.createWriteStream(out_1, { flags: 'w', encoding: null, fd: null, mode: 438 }))
                        .on('finish', function () {
                        fs.writeFile(out_1, req.files.image.data, function (err) {
                            if (err) {
                                console.log(err);
                            }
                        });
                    })
                        .on('close', function () {
                        resolve(out_1);
                    });
                }).then(function (path) {
                    var obj = new _this.model({ title: fileName, url: process.env.IMAGE_UPLOAD_CALLBACK + fileName });
                    obj.save(function (err, item) {
                        if (err && err.code === 11000) {
                            res.sendStatus(400);
                        }
                        if (err) {
                            return res.send(err);
                        }
                        return res.json({ isSuccessful: true, result: { path: process.env.IMAGE_UPLOAD_CALLBACK + fileName } });
                    });
                });
            }
            catch (err) {
                return res.json({ isSuccessful: false, err: err });
            }
        };
        _this.uploadPdf = function (req, res) {
            var fileName = "sanay_" + Date.now() + ".pdf";
            try {
                // process.env.IMAGE_UPLOAD_DIR
                var out_2 = path.join(__dirname, '../images', fileName);
                // throttle write speed to 4MB/s
                return new Promise(function (resolve, reject) {
                    req.pipe(new Throttle({ rate: 1024 * 4096 }))
                        .pipe(fs.createWriteStream(out_2, { flags: 'w', encoding: null, fd: null, mode: 438 }))
                        .on('finish', function () {
                        console.log(req.files);
                        fs.writeFile(out_2, req.files.image.data, function (err) {
                            if (err) {
                                console.log(err);
                            }
                        });
                    })
                        .on('close', function () {
                        resolve(out_2);
                    });
                }).then(function (path) {
                    return res.json({ isSuccessful: true, result: { path: process.env.IMAGE_UPLOAD_CALLBACK + fileName } });
                });
            }
            catch (err) {
                return res.json({ isSuccessful: false, err: err });
            }
        };
        return _this;
    }
    return UploadCtrl;
}(base_1.default));
exports.default = UploadCtrl;
//# sourceMappingURL=fileupload.js.map