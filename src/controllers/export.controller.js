import Order from 'models/order.model'
import Export from 'models/export.model'

export const getAllExports = async (req, res) => {
    let page = parseInt(req.query.page) || 0
    let itemPerPage = parseInt(req.query.itemPerPage) || 10
    let column = req.query.column !== '' ? parseInt(req.query.column) : ''
    let order = req.query.order || ''
    let colAttrs = ['createdAt']
    let colAttr = column !== '' ? colAttrs[column] : 'createdAt'
    let orderNumber = order === 'asc' ? 1 : -1

    let count = await Export.countDocuments()
    let totalPage = parseInt((count - 1) / itemPerPage) + 1
    if (page >= totalPage) page = totalPage - 1
    let exportedList = await Export.find()
        .sort({ [colAttr]: orderNumber })
        .skip(page * itemPerPage)
        .limit(itemPerPage)
        .populate({
            path: 'exportedList',
            select: 'payStatus',
            // match: { payStatus: true }
        })

    if (!count) {
        return res.boom.badRequest('Không tìm thấy dữ liệu!')
    }
    res.json({ exportedList, count })
}

export const getExport = async (req, res) => {
    let { idExported } = req.body
    let exported = await Export.findOne({ _id: idExported }).populate({
        path: 'exportedList',
        populate: {
            path: 'updater updater2',
            select: 'firstname lastname',
        },
        options: { sort: { group: -1 } },
    })
    if (!exported) {
        return res.boom.badRequest('Không tìm thấy dữ liệu!')
    }
    res.json({ exported })
}

export const exportReport = async (req, res) => {
    let { exportIdList } = req.body
    let orders = await Order.updateMany(
        {
            _id: { $in: exportIdList },
        },
        {
            $set: {
                reportExportedAt: new Date(),
            },
        },
        { new: true }
    )
    if (!orders) {
        return res.boom.badRequest('Xuất báo cáo thất bại!')
    }
    res.json({ orders })
}

export const setExport = async (req, res) => {
    let { idExported, exportedList } = req.body
    let orders = await Order.updateMany(
        {
            _id: { $in: exportedList },
        },
        {
            $set: {
                exported: false,
            },
        },
        { new: true }
    )
    let exported = await Export.deleteOne({ _id: idExported })
    if (!orders || !exported) {
        return res.boom.badRequest('Phục hồi thất bại!')
    }
    res.json({ orders, exported })
}

export const deleteExports = async (req, res) => {
    let { exportedList, exportsList } = req.body
    let orders = await Order.deleteMany({
        _id: { $in: exportedList },
    })

    let exported = await Export.deleteMany({
        _id: { $in: exportsList },
    })
    if (!orders || !exported) {
        return res.boom.badRequest('Xoá thất bại!')
    }
    res.json({ exported })
}

export default {
    getAllExports,
    getExport,
    setExport,
    exportReport,
    deleteExports,
}
