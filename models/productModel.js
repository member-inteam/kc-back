const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
    {
        sapID: {
            type: String,
            required: [true, 'A Product must have a SapID']
        },
        oldID: {
            type: String,
            required: [true, 'A Product must have an oldID']
        },
        created_at: {
            type: Date,
            default: Date.now()
        },
        product_name: {
            type: String,
            required: [true, 'A Product must have a name']
        },
        product_type: {
            type: String,
            required: [true, 'A Product must have a type']
        },
        status: {
            type: String,
            default: 'active'
        },
        product_divisions: {
            type: [Number],
            default: []
        },
        damaged_product_divisions: {
            type: [Number],
            default: []
        },
        price_before_discount: {
            type: Number,
            required: [true, 'A Product must have a price_before_discount']
        },
        price_after_discount: {
            type: Number,
            required: [true, 'A Product must have a price_after_discount']
        },
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
);


const Product = mongoose.model('Product', productSchema);

module.exports = Product;
