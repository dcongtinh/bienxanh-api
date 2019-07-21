import Order from 'models/order.model'
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

export const getAllOrders = async (req, res) => {
    let orders = await Order.find()
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
    res.json({ orders })
}

export const addOrder = async (req, res) => {
    let { warehouse, items, owner } = req.body
    let orders = await Order.find()
    let group = orders.length ? orders[orders.length - 1].group + 1 : 1
    let WareHouse = await wareHouse.findOne({ _id: warehouse })
    if (!WareHouse) return res.boom.badRequest('Lỗi')

    const newOrder = new Order({
        group,
        warehouse,
        buyerName: WareHouse.buyerName,
        items,
        owner
    })

    const newOrderSaved = await newOrder.save()
    if (!newOrderSaved) {
        return res.boom.badRequest('Đăng ký thất bại!')
    }
    res.json(newOrderSaved)
}

export const updateOrder = async (req, res) => {
    let { idOrder, warehouse, buyerName, items } = req.body
    const order = await Order.update(
        { _id: idOrder },
        {
            $set: {
                warehouse,
                buyerName,
                items,
                updatedAt: new Date()
            }
        },
        { new: true }
    )
    if (!order) res.boom.badRequest('Không tìm thấy dữ liệu!')

    res.json({ order })
}

// export const deleteItem = async (req, res) => {
//     let { ordersListId } = req.body
//     let orders = await Order.delete({
//         _id: { $in: ordersListId }
//     })
//     if (orders) res.json({ orders })
//     res.boom.badRequest('Xoá thất bại!')
// }

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
    updateOrder,
    deleteOrders
}
