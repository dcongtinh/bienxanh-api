import jwt from 'jsonwebtoken'
import config from '../config'

export const encode = data => {
    return jwt.sign(data, config.PRIVATE_KEY, {
        expiresIn: '30d'
    })
}

export const decode = token => {
    try {
        const tokenParsed = jwt.verify(token, config.PRIVATE_KEY)
        return tokenParsed
    } catch (error) {
        return null
    }
}

export default {
    encode,
    decode
}
