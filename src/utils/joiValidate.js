import joi from '@hapi/joi'
import _ from 'lodash'

const joiValidate = (schema, data, options = {}) => {
    joi.validate(data, schema, options, (error, value) => {
        if (error) {
            const joiError = {
                message: {
                    original: error._object,
                    // Fetch only message and type from each error
                    details: _.map(error.details, ({ message, type }) => ({
                        message: message.replace(/['"]/g, ''),
                        type
                    }))
                }
            }
            throw joiError
            return
        }
        return value
    })
}

export default joiValidate
