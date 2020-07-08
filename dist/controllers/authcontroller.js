"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var njwt = require("njwt");
exports.default = new /** @class */ (function () {
    function JWTCtrl() {
        this.create = function (obj) {
            var signingKey = 'catswillruletheworld';
            // const timeout = new Date().getTime() + process.env.TIMEOUT
            var jwt = njwt.create(obj, signingKey);
            // jwt.setExpiration(timeout)
            jwt.setExpiration(new Date().getTime() + (60 * 60 * 10 * 1000)); // 10 Hours from now
            return jwt.compact();
        };
        this.createAdminToken = function (obj) {
            var signingKey = 'catswillruletheworld';
            // const timeout = new Date().getTime() + process.env.TIMEOUT
            var jwt = njwt.create(obj, signingKey);
            // jwt.setExpiration(timeout)
            jwt.setExpiration(new Date().getTime() + (30 * 24 * 60 * 60 * 1000)); // one month from now
            return jwt.compact();
        };
        this.createRefreshToken = function (obj) {
            var signingKey = 'catswillruletheworldrefresh';
            var jwt = njwt.create(obj, signingKey);
            jwt.setExpiration(new Date().getTime() + (30 * 60 * 60 * 24 * 1000)); // One month from now
            return jwt.compact();
        };
        this.verify = function (token) {
            try {
                var signingKey = process.env.SECRET_TOKEN;
                return njwt.verify(token, signingKey).body;
            }
            catch (error) {
                return error;
            }
        };
    }
    return JWTCtrl;
}());
//# sourceMappingURL=authcontroller.js.map