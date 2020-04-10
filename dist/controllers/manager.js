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
var manager_1 = require("../models/manager");
var base_1 = require("./base");
var ManagerCtrl = /** @class */ (function (_super) {
    __extends(ManagerCtrl, _super);
    function ManagerCtrl() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.model = manager_1.default;
        return _this;
    }
    return ManagerCtrl;
}(base_1.default));
exports.default = ManagerCtrl;
//# sourceMappingURL=manager.js.map