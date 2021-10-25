import Mongoose from "mongoose"

const UserSchema = Mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true }
})

export default Mongoose.model('User', UserSchema)