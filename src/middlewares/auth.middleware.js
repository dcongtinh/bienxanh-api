import User from 'models/user.model'
import jwt from 'utils/jwt'

export const isAuthenticated = async (req, res, next) => {
    const authToken = req.headers.authorization
    if (!authToken) {
        return res.status(400).json('TOKEN_NOT_FOUND')
    }
    const tokenParsed = jwt.decode(authToken)
    if (!tokenParsed) {
        return res.status(400).json('INVALID_TOKEN')
    }
    const user = await User.findOne({ _id: tokenParsed.userKey })
    if (!user) {
        return res.status(400).json('USER_NOT_FOUND')
    }
    req.user = user
    next()
}

export default {
    isAuthenticated
}
