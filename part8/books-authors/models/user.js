import mongoose from "mongoose"

const schema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: 3
    },
    favoriteGenre: {
        type: String,
        minlength: 1
    }
})

export default mongoose.model("User", schema)