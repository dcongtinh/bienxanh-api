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
    const {
        firstname,
        lastname,
        username,
        password,
        email,
        siteAdmin,
        access
    } = req.body
    console.log(access)
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
        email,
        siteAdmin,
        access
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

export const getAllUser = async (req, res) => {
    const users = await User.find()
    if (users) return res.json({ users })
    res.boom.badRequest('Không tìm thấy dữ liệu!')
}

export const updateProfile = async (req, res) => {
    let { username, firstname, lastname, siteAdmin, access } = req.body
    const user = await User.update(
        { username },
        {
            $set: {
                firstname,
                lastname,
                siteAdmin,
                access,
                updatedAt: new Date()
            }
        },
        { new: true }
    )
    if (!user) res.boom.badRequest('Không tìm thấy dữ liệu!')

    res.json(user)
}

export const deleteUsers = async (req, res) => {
    let { usernames } = req.body
    let users = await User.deleteMany({ username: { $in: usernames } })
    if (users) res.json({ users })
    res.boom.badRequest('Xoá thất bại!')
}
export default {
    login,
    register,
    me,
    getUser,
    getAllUser,
    updateProfile,
    deleteUsers
}
