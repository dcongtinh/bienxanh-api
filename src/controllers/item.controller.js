import Item from 'models/item.model'

export const getItem = async (req, res) => {
    let { idItem } = req.body
    let item = await Item.findOne({ _id: idItem }).populate({
        path: 'itemUnit',
        select: 'unitName',
    })

    if (!item) {
        return res.boom.badRequest('Không tìm thấy dữ liệu!')
    }
    res.json({ item })
}

export const getAllItems = async (req, res) => {
    let items = await Item.find().populate({
        path: 'itemUnit',
        select: 'unitName',
    })
    if (!items) {
        return res.boom.badRequest('Không tìm thấy dữ liệu!')
    }
    res.json({ items })
}

export const addItem = async (req, res) => {
    const { itemName, itemUnit } = req.body
    const newItem = new Item({
        itemName,
        itemUnit,
    })
    const newItemSaved = await newItem.save()
    if (!newItemSaved) {
        return res.boom.badRequest('Gửi thất bại!')
    }
    res.json(newItemSaved)
}

export const updateItem = async (req, res) => {
    let { idItem, data } = req.body
    data = Object.assign({}, data, { updatedAt: new Date() })
    const item = await Item.update(
        { _id: idItem },
        {
            $set: data,
        },
        { new: true }
    )
    if (!item) {
        return res.boom.badRequest('Không tìm thấy dữ liệu!')
    }

    res.json({ item })
}

export const deleteItems = async (req, res) => {
    let { itemsListId } = req.body
    let items = await Item.deleteMany({
        _id: { $in: itemsListId },
    })
    if (items) {
        return res.json({ items })
    }
    res.boom.badRequest('Xoá thất bại!')
}

export const testItems = async (req, res) => {
    let items = await Item.updateMany(
        {},
        { $set: { itemUnit: '6207d7681cbbe51d6019df83' } }
    ) // Unit: KG
    if (items) {
        return res.json({ items })
    }
    res.boom.badRequest('Thất bại!')
}

export default {
    addItem,
    getAllItems,
    getItem,
    updateItem,
    deleteItems,
    testItems,
}
