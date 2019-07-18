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
        .populate('warehouse')
        .populate({
            path: 'itemName',
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
    const { warehouse, itemName, batchNo, items, itemNote, owner } = req.body
    let group = (await Order.find().count()) + 1
    let WareHouse = await wareHouse.findOne({ _id: warehouse })
    if (!WareHouse) return res.boom.badRequest('Lỗi')

    const newOrder = new Order({
        group,
        warehouse,
        buyerName: WareHouse.buyerName,
        itemName,
        batchNo,
        items,
        itemNote,
        owner
    })

    const newOrderSaved = await newOrder.save()
    if (!newOrderSaved) {
        return res.boom.badRequest('Đăng ký thất bại!')
    }
    res.json(newOrderSaved)
}

export const updateOrder = async (req, res) => {
    let {
        idOrder,
        group,
        warehouse,
        itemName,
        batchNo,
        items,
        itemNote,
        owner
    } = req.body
    const order = await Order.update(
        { _id: idOrder },
        {
            $set: {
                group,
                warehouse,
                itemName,
                batchNo,
                items,
                itemNote,
                owner,
                updatedAt: new Date()
            }
        },
        { new: true }
    )
    if (!order) res.boom.badRequest('Không tìm thấy dữ liệu!')

    res.json({ order })
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
    updateOrder,
    deleteOrders
}
