// models/BasketItem.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const basketItemSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    product: { type: Schema.Types.ObjectId, ref: 'Product' },
    count: Number
});

module.exports = mongoose.model('BasketItem', basketItemSchema);
