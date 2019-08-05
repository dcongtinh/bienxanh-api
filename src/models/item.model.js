import mongoose from 'mongoose'

const itemSchema = mongoose.Schema(
    {
        itemName: String,
        itemPrices: [
            {
                itemPrice: Number,
                wareHouses: [[{ label: String, value: String }]],
                customDateApply: String,
                dateApply: Date
            }
        ]
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
