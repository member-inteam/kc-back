const mongoose = require('mongoose');

const entrySchema = new mongoose.Schema({
    key: String,
    label: String,
    value: String,
});

const referenceSchema = new mongoose.Schema(
    {
        type_options: {
            type: [mongoose.Schema.Types.Mixed],
        },
        windows: {
            type: [mongoose.Schema.Types.Mixed],
        },
        show_rooms: {
            type: Map,
            of: [entrySchema],
        },
        sales_men: {
            type: Map,
            of: [entrySchema],
        },
        product_types: {
            type: [mongoose.Schema.Types.Mixed],
        },
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
);


const Reference = mongoose.model('Reference', referenceSchema);

module.exports = Reference;
