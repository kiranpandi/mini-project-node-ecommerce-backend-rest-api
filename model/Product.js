const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    productImage: { type: String }
});

const Product = mongoose.model('Product',productSchema);

module.exports = Product;