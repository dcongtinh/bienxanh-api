import Item from 'models/item.model'

export const getItem = async (req, res) => {
    let { idItem } = req.body
    let item = await Item.findOne({ _id: idItem })

    if (!item) {
        return res.boom.badRequest('Không tìm thấy dữ liệu!')
    }
    res.json({ item })
}

export const getAllItems = async (req, res) => {
    let items = await Item.find()
    if (!items) {
        return res.boom.badRequest('Không tìm thấy dữ liệu!')
    }
    res.json({ items })
}

export const addItem = async (req, res) => {
    const { itemName, itemPrices } = req.body
    const newItem = new Item({
        itemName,
        itemPrices
    })
    const newItemSaved = await newItem.save()
    if (!newItemSaved) {
        return res.boom.badRequest('Gửi thất bại!')
    }
    res.json(newItemSaved)
}

export const updateItem = async (req, res) => {
    let { idItem, itemName, itemPrices } = req.body
    const item = await Item.update(
        { _id: idItem },
        {
            $set: {
                itemName,
                itemPrices,
                updatedAt: new Date()
            }
        },
        { new: true }
    )
    if (!item) res.boom.badRequest('Không tìm thấy dữ liệu!')

    res.json({ item })
}

export const deleteItems = async (req, res) => {
    let { itemsListId } = req.body
    let items = await Item.deleteMany({
        _id: { $in: itemsListId }
    })
    if (items) res.json({ items })
    res.boom.badRequest('Xoá thất bại!')
}

export default {
    addItem,
    getAllItems,
    getItem,
    updateItem,
    deleteItems
}
