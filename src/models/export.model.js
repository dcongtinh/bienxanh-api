import mongoose from 'mongoose'

const exportSchema = mongoose.Schema(
    {
        exportedList: {
            type: [{ type: String, ref: 'Order' }],
            default: []
        }
    },
    { timestamps: true }
)

const ExportModel = mongoose.model(
    // model name
    'Export',
    // schema
    exportSchema,
    // collection name
    'exports'
)

export default ExportModel
