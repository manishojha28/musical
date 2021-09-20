const mongoose = require("mongoose");
const { Schema } = mongoose;

const likedSongsSchema = new Schema({
    _id: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    songs: []
})

module.exports = mongoose.model("LikedSongs", likedSongsSchema);