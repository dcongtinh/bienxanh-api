import mongoose from 'mongoose'

const wareHouseSchema = mongoose.Schema(
    {
        warehouse: String,
        warehouseName: String,
        buyerName: String,
        buyerCode: String,
        buyerAddress: String,
        buyerArea: Number,
        buyerLegalName: String,
        buyerTaxCode: String
    },
    { timestamps: true }
)

const WarehouseModel = mongoose.model(
    // model name
    'Warehouse',
    // schema
    wareHouseSchema,
    // collection name
    'warehouses'
)

export default WarehouseModel
