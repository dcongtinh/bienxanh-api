import mongoose from 'mongoose'

const supplierSchema = mongoose.Schema(
    {
        supplierCode: String,
        supplierName: String,
        supplierIdNo: String,
        supplierAddress: String,
        supplierNote: String,
        supplierItems: [{ value: String, label: String }]
    },
    { timestamps: true }
)

const SupplierModel = mongoose.model(
    // model name
    'Supplier',
    // schema
    supplierSchema,
    // collection name
    'suppliers'
)

export default SupplierModel
