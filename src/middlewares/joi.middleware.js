import joiValidate from 'utils/joiValidate'

const joiMiddleware = (schema, options = {}) => (req, res, next) => {
    try {
        joiValidate(schema, req.body, options)
        next()
    } catch (error) {
        res.boom.notAcceptable(null, error)
    }
}

export default joiMiddleware
