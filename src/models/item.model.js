import mongoose from 'mongoose'

const itemSchema = mongoose.Schema(
    {
        itemName: String,
        itemPrices: {
            type: [{}],
            default: []
        },
        itemTradePrices: {
            type: [{}],
            default: []
        },
        itemSuppliers: {
            type: [{}],
            default: []
        }
    },
    { timestamps: true }
)

const ItemModel = mongoose.model(
    // model name
    'Item',
    // schema
    itemSchema,
    // collection name
    'items'
)

export default ItemModel
