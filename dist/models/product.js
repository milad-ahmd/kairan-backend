"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var moment = require("moment-timezone");
var mongoosePaginate = require("mongoose-paginate-v2");
var feature_1 = require("./feature");
var productSchema = new mongoose.Schema({
    title: String,
    titleEn: String,
    logo: String,
    image: String,
    productImages: [],
    description: String,
    descriptionEn: String,
    manager: String,
    features: [feature_1.default],
    customer: String,
    order: { type: Number, default: 0 },
    deleted: { type: Boolean, default: false },
    created_at: { type: Number, "default": moment().unix() },
    updated_at: { type: Number, "default": moment().unix() }
});
productSchema.plugin(mongoosePaginate);
var Product = mongoose.model('Product', productSchema);
exports.default = Product;
//# sourceMappingURL=product.js.map