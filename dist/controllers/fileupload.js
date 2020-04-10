"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// var fs = require("fs");
// var path = require("path");
var fs = require("fs");
var path = require("path");
var Throttle = require("stream-throttle").Throttle;
var UploadCtrl = /** @class */ (function () {
    function UploadCtrl() {
        this.upload = function (req, res) {
            var fileName = "glasses_" + Date.now() + ".jpg";
            try {
                // process.env.IMAGE_UPLOAD_DIR
                var out_1 = path.join(__dirname, process.env.IMAGE_UPLOAD_DIR, fileName);
                // throttle write speed to 4MB/s
                return new Promise(function (resolve, reject) {
                    req.pipe(new Throttle({ rate: 1024 * 4096 }))
                        .pipe(fs.createWriteStream(out_1, { flags: 'w', encoding: null, fd: null, mode: 438 }))
                        .on('finish', function () {
                        console.log(req.files);
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
                    return res.json({ isSuccessful: true, result: { path: process.env.IMAGE_UPLOAD_CALLBACK + fileName } });
                });
            }
            catch (err) {
                return res.json({ isSuccessful: false, err: err });
            }
        };
    }
    return UploadCtrl;
}());
exports.default = UploadCtrl;
//# sourceMappingURL=fileupload.js.map