import Supplier from 'models/supplier.model'

export const getSupplier = async (req, res) => {
    let { idSupplier } = req.body
    let supplier = await Supplier.findOne({ _id: idSupplier })

    if (!supplier) {
        return res.boom.badRequest('Không tìm thấy dữ liệu!')
    }
    res.json({ supplier })
}

export const getAllSuppliers = async (req, res) => {
    let limit = 10
    let page = 1
    let suppliers = await Supplier.find()
        .skip((page - 1) * limit)
        .limit(limit)
    let count = await Supplier.count()
    if (!count) {
        return res.boom.badRequest('Không tìm thấy dữ liệu!')
    }
    res.json({ suppliers, count })
}

export const addSupplier = async (req, res) => {
    const {
        supplierCode,
        supplierName,
        supplierIdNo,
        supplierAddress,
        supplierNote,
        supplierItems
    } = req.body
    const newSupplier = new Supplier({
        supplierCode,
        supplierName,
        supplierIdNo,
        supplierAddress,
        supplierNote,
        supplierItems
    })
    const newSupplierSaved = await newSupplier.save()
    if (!newSupplierSaved) {
        return res.boom.badRequest('Gửi thất bại!')
    }
    res.json(newSupplierSaved)
}

export const updateSupplier = async (req, res) => {
    let { idSupplier, data } = req.body
    data = Object.assign({}, data, { updatedAt: new Date() })
    const item = await Supplier.update(
        { _id: idSupplier },
        {
            $set: data
        },
        { new: true }
    )
    if (!item) res.boom.badRequest('Không tìm thấy dữ liệu!')

    res.json({ item })
}

export const deleteSuppliers = async (req, res) => {
    let { suppliersListId } = req.body
    let suppliers = await Supplier.deleteMany({
        _id: { $in: suppliersListId }
    })
    if (suppliers) res.json({ suppliers })
    res.boom.badRequest('Xoá thất bại!')
}

export default {
    addSupplier,
    getAllSuppliers,
    getSupplier,
    updateSupplier,
    deleteSuppliers
}
