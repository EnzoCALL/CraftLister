import Mongoose from "mongoose"

const CraftPostSchema = Mongoose.Schema({
    title: { type: String, required: true },
    content1: { type: String, required: true },
    content2: { type: String, required: false },
    content3: { type: String, required: false },
    content4: { type: String, required: false },
    content5: { type: String, required: false },
    author: { type: String, default: 'Anonymous' },
    createdAt: { type: Date, default: Date.now() },
})

export default Mongoose.model('CraftPost', CraftPostSchema)