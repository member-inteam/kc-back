const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
    {
        created_at: {
            type: String,
            default: new Date(Date.now()).toLocaleString()
        },
        customer_name: {
            type: String,
            required: [true, 'An order must belong to a customer']
        },
        phone_number: {
            type: String,
            required: [true, 'An order must contains at least one phone number']
        },
        phone_number_2: {
            type: String
        },
        address: {
            type: String,
            required: [true, 'An order must have an adress']
        },
        area: {
            type: String,
            required: [true, 'An order must have an area']
        },
        show_room: {
            type: String,
            required: [true, 'An order must belong to an show room']
        },
        sales_man: {
            type: String,
            required: [true, 'An order must belong to an sales man']
        },
        branch: {
            type: String,
            required: [true, 'An order must belong to a branch']
        },
        order_type: {
            type: String,
            required: [true, 'An order must have a type']
        },
        delivery_type: {
            type: String,
            required: [true, 'An order must have a delivery type']
        },
        delivery_date: {
            type: String,
            required: [true, 'An order must have a delivery date']
        },
        technical: {
            type: String,
            required: [true, 'An order must have a technical']
        },
        status: {
            type: String,
            default: "قيد الإنتظار"
        },
        is_vip: {
            type: Boolean,
            default: false
        },

        products: [
            {
                product: String,
                quantity: Number,
            }
        ],
        rooms: {
            type: [mongoose.Schema.Types.Mixed], // Accepts array of any shape
        },
        cuttoff_materials: [
            {
                product: String,
                quantity: Number

            }

        ]
    },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
);


const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
