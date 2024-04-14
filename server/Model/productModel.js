const mongoose = require("mongoose");


const productSchema = new mongoose.Schema({
    name: {
        type: String
    },
    price: {
        type: String,
    },
    image: {
        type: String
    }
});
productSchema.index({ '$**': 'text' });
const productModel = mongoose.model('product', productSchema);

module.exports = productModel;