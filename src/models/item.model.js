import mongoose from 'mongoose'

const itemSchema = mongoose.Schema(
    {
        itemNameCode: String,
        itemName: String
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
