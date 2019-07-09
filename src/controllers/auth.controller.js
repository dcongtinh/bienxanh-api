import User from 'models/user.model'
import jwt from 'utils/jwt'
import joi from '@hapi/joi'
import _ from 'lodash'
import joiValidate from 'utils/joiValidate'

export const login = async (req, res) => {
    const { username, password } = req.body

    const user = await User.findOne({ username })
    if (!user) {
        return res.boom.unauthorized('Tài khoản không tồn tại')
    }
    if (!user.validPassword(password)) {
        return res.boom.unauthorized('Sai tên tài khoản hoặc mật khẩu')
    }
    const authToken = jwt.encode({
        userKey: user._id
    })
    res.json({
        token: authToken,
        user
    })
}

export const register = async (req, res) => {
    const { firstname, lastname, username, password, email } = req.body
    // res.json({ firstname, lastname, username, password, email })
    const user = await User.findOne({ username })
    if (user) {
        return res.boom.unauthorized('Tài khoản đã tồn tại!')
    }
    const newUser = new User({
        firstname,
        lastname,
        username,
        password,
        email
    })
    newUser.password = newUser.generatePassword(password)
    const userSaved = await newUser.save()
    if (!userSaved) {
        return res.boom.badRequest('Đăng ký thất bại!')
    }
    res.json(userSaved)
}

export const getUser = async (req, res) => {
    const { username } = req.body
    const user = await User.findOne({ username })
    if (user) return res.json({ user })
    res.boom.badRequest('Không tìm thấy dữ liệu!')
}

const me = (req, res) => {
    res.json(req.user)
}

export const updateProfile = async (req, res) => {
    let { username, firstname, lastname } = req.body
    const user = await User.findOne({ username })
    if (!user) res.boom.badRequest('Không tìm thấy dữ liệu!')
    user.firstname = firstname
    user.lastname = lastname
    const userSaved = await new User(user).save()
    if (!userSaved) {
        return res.boom.badRequest('Cập nhật thất bại!')
    }
    res.json(userSaved)
}

export default {
    login,
    register,
    me,
    getUser,
    updateProfile
}
