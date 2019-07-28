import mongoose from 'mongoose'

const itemSchema = mongoose.Schema(
    {
        itemNameCode: String,
        itemName: String,
        itemPrices: [
            {
                itemPrice: Number,
                areaPrice: {
                    0: Boolean,
                    1: Boolean,
                    2: Boolean
                }
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
