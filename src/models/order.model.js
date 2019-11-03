import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate'

const orderSchema = mongoose.Schema(
    {
        group: Number,
        warehouse: {
            type: String,
            ref: 'Warehouse'
        },
        buyerName: String,
        payStatus: {
            type: Boolean,
            default: false
        },
        orders: {
            type: [
                {
                    itemName: String,
                    itemLoss: {
                        type: Number,
                        default: 0
                    },
                    itemSupplier: String,
                    itemPrice: {
                        type: Number,
                        default: 0
                    },
                    itemTradePrice: {
                        type: Number,
                        default: 0
                    },
                    itemFeeShip: {
                        type: Number,
                        default: 0
                    },
                    itemFeeNorth: {
                        type: Number,
                        default: 0
                    },
                    itemFeeCentral: {
                        type: Number,
                        default: 0
                    },
                    itemFeeSouth: {
                        type: Number,
                        default: 0
                    },
                    itemShipper: String,
                    itemWeight: {
                        type: Number,
                        default: 0
                    },
                    itemTransfer: String,
                    itemQuantity: {
                        type: Number,
                        default: 0
                    }
                }
            ],
            default: []
        },
        itemNote: String,
        taxPercentag: {
            type: [Number],
            default: [-2]
        },
        owner: {
            type: String,
            ref: 'User'
        },
        mergeList: {
            type: [String],
            default: []
        },
        enabled: {
            type: Boolean,
            default: true
        },
        exported: {
            type: Boolean,
            default: false
        },
        date: {
            type: Date,
            default: new Date()
        },
        reportExportedAt: {
            type: Date,
            default: null
        }
    },
    { timestamps: true }
)

orderSchema.plugin(mongoosePaginate)

const OrderModel = mongoose.model(
    // model name
    'Order',
    // schema
    orderSchema,
    // collection name
    'orders'
)

export default OrderModel
