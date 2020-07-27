import Warehouse from 'models/wareHouse.model'

export const getWarehouse = async (req, res) => {
    let { idWarehouse } = req.body
    let wareHouse = await Warehouse.findOne({ _id: idWarehouse })

    if (!wareHouse) {
        return res.boom.badRequest('Không tìm thấy dữ liệu!')
    }
    res.json({ wareHouse })
}

export const getAllWarehouses = async (req, res) => {
    let wareHouses = await Warehouse.find().sort({ priority: 1 })
    let count = await Warehouse.countDocuments()
    if (!count) {
        return res.boom.badRequest('Không tìm thấy dữ liệu!')
    }
    res.json({ wareHouses, count })
}

export const showAllWarehouses = async (req, res) => {
    if (req.query.filters) console.log(req.query.filters.split(','))
    let page = parseInt(req.query.page) || 0
    let itemPerPage = parseInt(req.query.itemPerPage) || 100
    let searchText = req.query.searchText
    let column = req.query.column !== '' ? parseInt(req.query.column) : ''
    let order = req.query.order || ''
    let colAttrs = [
        'buyerCode',
        'warehouseName',
        'buyerName',
        'buyerLegalName',
        'buyerTaxCode'
    ]
    let colAttr = column !== '' ? colAttrs[column] : 'priority'
    let orderNumber = order === 'desc' ? -1 : 1

    // { $text: { $search: ".*include this text.*", $caseSensitive: false,
    //                 $diacriticSensitive: false } },
    // { htmlContent: false, rawContent: false, textContent: false }
    // function diacriticSensitiveRegex(string = '') {
    //     return string
    //         .replace(/a/g, '[a,á,à,ä]')
    //         .replace(/e/g, '[e,é,ë]')
    //         .replace(/i/g, '[i,í,ï]')
    //         .replace(/o/g, '[o,ó,ö,ò]')
    //         .replace(/u/g, '[u,ü,ú,ù]')
    //         .replace(/\(/g, '')
    //         .replace(/\)/g, '')
    // }
    // console.log(diacriticSensitiveRegex('AP'))
    let count = await Warehouse.countDocuments()
    let totalPage = parseInt((count - 1) / itemPerPage) + 1
    if (page >= totalPage) page = totalPage - 1
    let wareHouses = await Warehouse.find({
        // buyerTaxCode: {
        //     $regex: '030'
        // }
    })
        .sort({ [colAttr]: orderNumber })
        .skip(page * itemPerPage)
        .limit(itemPerPage)

    // console.log(wareHouses, count)
    if (!count) {
        return res.boom.badRequest('Không tìm thấy dữ liệu!')
    }
    res.json({ wareHouses, count })
}

export const addWarehouse = async (req, res) => {
    const {
        warehouse,
        warehouseName,
        buyerCode,
        buyerAddress,
        buyerArea,
        buyerLegalName,
        buyerTaxCode
    } = req.body
    let buyerName = `26296/WH${buyerCode}/`
    const newWarehouse = new Warehouse({
        warehouse,
        warehouseName,
        buyerName,
        buyerCode,
        buyerAddress,
        buyerArea,
        buyerLegalName,
        buyerTaxCode
    })
    const wareHouseSaved = await newWarehouse.save()
    if (!wareHouseSaved) {
        return res.boom.badRequest('Đăng ký thất bại!')
    }
    res.json(wareHouseSaved)
}

export const updateWarehouse = async (req, res) => {
    let {
        idWarehouse,
        warehouse,
        warehouseName,
        buyerCode,
        buyerAddress,
        buyerArea,
        buyerLegalName,
        buyerTaxCode
    } = req.body
    let buyerName = `26296/WH${buyerCode}/`
    const wareHouse = await Warehouse.update(
        { _id: idWarehouse },
        {
            $set: {
                warehouse,
                warehouseName,
                buyerName,
                buyerCode,
                buyerAddress,
                buyerArea,
                buyerLegalName,
                buyerTaxCode,
                updatedAt: new Date()
            }
        },
        { new: true }
    )
    if (!wareHouse) res.boom.badRequest('Không tìm thấy dữ liệu!')

    res.json({ wareHouse })
}

export const deleteWareHouses = async (req, res) => {
    let { wareHousesListId } = req.body
    let wareHouses = await Warehouse.deleteMany({
        _id: { $in: wareHousesListId }
    })
    if (wareHouses) res.json({ wareHouses })
    res.boom.badRequest('Xoá thất bại!')
}

export default {
    getAllWarehouses,
    showAllWarehouses,
    getWarehouse,
    addWarehouse,
    updateWarehouse,
    deleteWareHouses
}
