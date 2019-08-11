import Order from 'models/order.model'
import Export from 'models/export.model'

export const getAllExports = async (req, res) => {
    let exportedList = await Export.find().populate('exportedList')
    if (!exportedList) {
        return res.boom.badRequest('Không tìm thấy dữ liệu!')
    }
    res.json({ exportedList })
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

export default {
    getAllExports,
    getExport,
    setExport
}
