import Order from 'models/order.model'
import Export from 'models/export.model'

export const getAllExports = async (req, res) => {
    let exportedList = await Export.find().populate('exportedList')
    let exportedListId = await Export.find()
    if (!exportedList || !exportedListId) {
        return res.boom.badRequest('Không tìm thấy dữ liệu!')
    }
    res.json({ exportedList, exportedListId })
}

export const getExport = async (req, res) => {
    let { idExported } = req.body
    let exported = await Export.findOne({ _id: idExported }).populate(
        'exportedList'
    )
    if (!exported) {
        return res.boom.badRequest('Không tìm thấy dữ liệu!')
    }
    res.json({ exported })
}

export const setExport = async (req, res) => {
    let { idExported, exportedList } = req.body
    let orders = await Order.updateMany(
        {
            _id: { $in: exportedList }
        },
        {
            $set: {
                exported: false
            }
        },
        { new: true }
    )
    let exported = await Export.deleteOne({ _id: idExported })
    if (!orders || !exported) res.boom.badRequest('Phục hồi thất bại!')
    res.json({ orders, exported })
}

export const deleteExports = async (req, res) => {
    let { exportedList, exportsList } = req.body
    let orders = await Order.deleteMany({
        _id: { $in: exportedList }
    })

    let exported = await Export.deleteMany({
        _id: { $in: exportsList }
    })
    if (!orders || !exported) res.boom.badRequest('Xoá thất bại!')
    res.json({ exported })
}

export default {
    getAllExports,
    getExport,
    setExport,
    deleteExports
}
