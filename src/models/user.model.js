import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const userSchema = mongoose.Schema({
    firstname: String,
    lastname: String,
    username: String,
    password: String,
    email: String
})

userSchema.methods.generatePassword = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null)
}

userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password)
}

const UserModel = mongoose.model(
    // model name
    'User',
    // schema
    userSchema,
    // collection name
    'users'
)

export default UserModel
