import Unit from 'models/unit.model'

export const getUnit = async (req, res) => {
    let { idUnit } = req.body
    let unit = await Unit.findOne({ _id: idUnit })

    if (!unit) {
        return res.boom.badRequest('Không tìm thấy dữ liệu!')
    }
    res.json({ unit })
}

export const getAllUnits = async (req, res) => {
    let units = await Unit.find()
    if (!units) {
        return res.boom.badRequest('Không tìm thấy dữ liệu!')
    }
    res.json({ units })
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
    const unit = await Unit.update(
        { _id: idUnit },
        {
            $set: data,
        },
        { new: true }
    )
    if (!unit) {
        return res.boom.badRequest('Không tìm thấy dữ liệu!')
    }

    res.json({ unit })
}

export const deleteUnits = async (req, res) => {
    let { unitsListId } = req.body
    let units = await Unit.deleteMany({
        _id: { $in: unitsListId },
    })
    if (units) {
        return res.json({ units })
    }
    res.boom.badRequest('Xoá thất bại!')
}

export default {
    addUnit,
    getAllUnits,
    getUnit,
    updateUnit,
    deleteUnits,
}
