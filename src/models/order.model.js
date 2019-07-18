import mongoose from 'mongoose'

const orderSchema = mongoose.Schema(
    {
        group: Number,
        warehouse: {
            type: String,
            ref: 'Warehouse'
        },
        buyerName: String,
        items: [
            {
                itemName: {
                    type: String,
                    ref: 'Item'
                },
                itemNote: String,
                batchNo: String,
                itemQuantity: Number,
                itemPrice: Number,
                itemUnit: {
                    type: String,
                    default: 'KG'
                }
            }
        ],
        taxPercentag: {
            type: [Number],
            default: [-2]
        },
        owner: {
            type: String,
            ref: 'User'
        }
    },
    { timestamps: true }
)

const OrderModel = mongoose.model(
    // model name
    'Order',
    // schema
    orderSchema,
    // collection name
    'orders'
)

export default OrderModel
