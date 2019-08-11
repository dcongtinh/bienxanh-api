import Order from 'models/order.model'
import Export from 'models/export.model'
import wareHouse from 'models/wareHouse.model'

export const getOrder = async (req, res) => {
    let { idOrder } = req.body
    let order = await Order.findOne({ _id: idOrder })
        .populate('warehouse')
        .populate({
            path: 'items.itemName',
            select: 'itemNameCode itemName'
        })
        .populate({
            path: 'owner',
            select: 'firstname lastname'
        })

    if (!order) {
        return res.boom.badRequest('Không tìm thấy dữ liệu!')
    }
    res.json({ order })
}

// export const getAllOrders = async (req, res) => {
//     const query = {}
//     const options = {
//         sort: { createdAt: -1 },
//         populate: [
//             'warehouse',
//             {
//                 path: 'items.itemName',
//                 select: 'itemNameCode itemName'
//             },
//             {
//                 path: 'owner',
//                 select: 'firstname lastname'
//             }
//         ],
//         limit: parseInt(req.query.itemPerPage || 10),
//         page: parseInt(req.query.page || 1)
//     }

//     const orders = await Order.paginate(query, options)

//     // let orders = await Order.find()
//     //     .sort({ createdAt: -1 })
//     //     .populate('warehouse')
//     //     .populate({
//     //         path: 'items.itemName',
//     //         select: 'itemNameCode itemName'
//     //     })
//     //     .populate({
//     //         path: 'owner',
//     //         select: 'firstname lastname'
//     //     })
//     if (!orders.total) {
//         return res.boom.badRequest('Không tìm thấy dữ liệu!')
//     }
//     // if (!orders) {
//     //     return res.boom.badRequest('Không tìm thấy dữ liệu!')
//     // }
//     res.json(orders)
// }

export const getAllOrders = async (req, res) => {
    let orders = await Order.find({ enabled: true, exported: false })
        .sort({ createdAt: -1 })
        .populate('warehouse')
        .populate({
            path: 'items.itemName',
            select: 'itemNameCode itemName'
        })
        .populate({
            path: 'owner',
            select: 'firstname lastname'
        })
    if (!orders) {
        return res.boom.badRequest('Không tìm thấy dữ liệu!')
    }
    res.json(orders)
}

export const addOrder = async (req, res) => {
    let {
        group,
        warehouse,
        date,
        itemNote,
        owner,
        mergeList,
        orders
    } = req.body
    if (!group) {
        let _orders = await Order.find()
        group = _orders.length ? _orders.length + 1 : 1
    }
    let WareHouse = await wareHouse.findOne({ _id: warehouse })
    if (!WareHouse) return res.boom.badRequest('Lỗi')

    const newOrder = new Order({
        group,
        warehouse,
        buyerName: WareHouse.buyerName,
        owner,
        date,
        itemNote,
        mergeList: mergeList || [],
        orders: orders || []
    })

    const newOrderSaved = await newOrder.save()
    if (!newOrderSaved) {
        return res.boom.badRequest('Đăng ký thất bại!')
    }
    res.json(newOrderSaved)
}

export const addOrders = async (req, res) => {
    let { arrayOrders } = req.body

    const orders = await Order.insertMany(arrayOrders)
    if (!orders) {
        return res.boom.badRequest('Tạo hoá đơn thất bại!')
    }
    res.json({ orders })
}

export const updateOrder = async (req, res) => {
    let { idOrder, data } = req.body
    data = Object.assign({}, data, { updatedAt: new Date() })

    const order = await Order.updateOne(
        { _id: idOrder },
        {
            $set: data
        },
        { new: true }
    )
    if (!order) res.boom.badRequest('Không tìm thấy dữ liệu!')

    res.json({ order })
}

export const mergeOrders = async (req, res) => {
    let { ordersListId, enabled } = req.body
    let orders = await Order.updateMany(
        {
            _id: { $in: ordersListId }
        },
        {
            $set: {
                enabled
            }
        },
        { new: true }
    )
    if (orders) res.json({ orders })
    res.boom.badRequest('Hợp thất bại!')
}

export const exportOrders = async (req, res) => {
    let { ordersListId } = req.body
    let orders = await Order.updateMany(
        {
            _id: { $in: ordersListId }
        },
        {
            $set: {
                exported: true
            }
        },
        { new: true }
    )
    let exported = new Export({
        exportedList: ordersListId
    })
    let exportedSave = await exported.save()
    if (!orders || !exportedSave) res.boom.badRequest('Hợp thất bại!')
    res.json({ orders, exportedSave })
}

export const deleteOrders = async (req, res) => {
    let { ordersListId } = req.body
    let orders = await Order.deleteMany({
        _id: { $in: ordersListId }
    })
    if (orders) res.json({ orders })
    res.boom.badRequest('Xoá thất bại!')
}

export default {
    getAllOrders,
    getOrder,
    addOrder,
    addOrders,
    updateOrder,
    mergeOrders,
    exportOrders,
    deleteOrders
}
