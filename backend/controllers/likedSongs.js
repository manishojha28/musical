const LikedSongs = require('../database/likedSongs')

exports.getLikedSongs = async (req, res) => {
    try {
        const songIds = await LikedSongs.findById(req.params.id)
        res.json({ likedSongs: songIds.songs, success: true })
    }
    catch(err) {
        res.json({ success: false, err })
    }
}

exports.addToLikedSongs = async (req, res) => {
    const { data } = req.body
    try {
        const likedSongsData = await LikedSongs.findByIdAndUpdate(req.params.id, { $push: { songs: data } })
        res.json({success: true, likedSongsData})
    }
    catch(err) {
        res.json({success: false, err})
    }
}