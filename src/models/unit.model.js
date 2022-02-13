import mongoose from 'mongoose'

const unitSchema = mongoose.Schema(
    {
        unitName: String,
    },
    { timestamps: true }
)

const UnitModel = mongoose.model(
    // model name
    'Unit',
    // schema
    unitSchema,
    // collection name
    'units'
)

export default UnitModel
