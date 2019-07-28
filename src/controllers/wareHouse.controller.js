import Warehouse from 'models/wareHouse.model'

export const getWarehouse = async (req, res) => {
    let { idWarehouse } = req.body
    let wareHouse = await Warehouse.findOne({ _id: idWarehouse })

    if (!wareHouse) {
        return res.boom.badRequest('Không tìm thấy dữ liệu!')
    }
    res.json({ wareHouse })
}

export const getAllWarehouses = async (req, res) => {
    let wareHouses = await Warehouse.find()
    if (!wareHouses) {
        return res.boom.badRequest('Không tìm thấy dữ liệu!')
    }
    res.json({ wareHouses })
}

export const addWarehouse = async (req, res) => {
    const {
        warehouse,
        warehouseName,
        buyerCode,
        buyerAddress,
        buyerArea,
        buyerLegalName,
        buyerTaxCode
    } = req.body
    let buyerName = `26296/WH${buyerCode}/`
    const newWarehouse = new Warehouse({
        warehouse,
        warehouseName,
        buyerName,
        buyerCode,
        buyerAddress,
        buyerArea,
        buyerLegalName,
        buyerTaxCode
    })
    const wareHouseSaved = await newWarehouse.save()
    if (!wareHouseSaved) {
        return res.boom.badRequest('Đăng ký thất bại!')
    }
    res.json(wareHouseSaved)
}

export const updateWarehouse = async (req, res) => {
    let {
        idWarehouse,
        warehouse,
        warehouseName,
        buyerCode,
        buyerAddress,
        buyerArea,
        buyerLegalName,
        buyerTaxCode
    } = req.body
    let buyerName = `26296/WH${buyerCode}/`
    const wareHouse = await Warehouse.update(
        { _id: idWarehouse },
        {
            $set: {
                warehouse,
                warehouseName,
                buyerName,
                buyerCode,
                buyerAddress,
                buyerArea,
                buyerLegalName,
                buyerTaxCode,
                updatedAt: new Date()
            }
        },
        { new: true }
    )
    if (!wareHouse) res.boom.badRequest('Không tìm thấy dữ liệu!')

    res.json({ wareHouse })
}

export const deleteWareHouses = async (req, res) => {
    let { wareHousesListId } = req.body
    let wareHouses = await Warehouse.deleteMany({
        _id: { $in: wareHousesListId }
    })
    if (wareHouses) res.json({ wareHouses })
    res.boom.badRequest('Xoá thất bại!')
}

export default {
    getAllWarehouses,
    getWarehouse,
    addWarehouse,
    updateWarehouse,
    deleteWareHouses
}
