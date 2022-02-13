import Unit from 'models/unit.model'

export const getUnit = async (req, res) => {
    let { idUnit } = req.body
    let item = await Unit.findOne({ _id: idUnit })

    if (!item) {
        return res.boom.badRequest('Không tìm thấy dữ liệu!')
    }
    res.json({ item })
}

export const getAllUnits = async (req, res) => {
    let items = await Unit.find()
    if (!items) {
        return res.boom.badRequest('Không tìm thấy dữ liệu!')
    }
    res.json({ items })
}

export const addUnit = async (req, res) => {
    const { unitName } = req.body
    const newUnit = new Unit({
        unitName,
    })
    const newUnitSaved = await newUnit.save()
    if (!newUnitSaved) {
        return res.boom.badRequest('Gửi thất bại!')
    }
    res.json(newUnitSaved)
}

export const updateUnit = async (req, res) => {
    let { idUnit, data } = req.body
    data = Object.assign({}, data, { updatedAt: new Date() })
    const item = await Unit.update(
        { _id: idUnit },
        {
            $set: data,
        },
        { new: true }
    )
    if (!item) res.boom.badRequest('Không tìm thấy dữ liệu!')

    res.json({ item })
}

export const deleteUnits = async (req, res) => {
    let { itemsListId } = req.body
    let items = await Unit.deleteMany({
        _id: { $in: itemsListId },
    })
    if (items) res.json({ items })
    res.boom.badRequest('Xoá thất bại!')
}

export default {
    addUnit,
    getAllUnits,
    getUnit,
    updateUnit,
    deleteUnits,
}
