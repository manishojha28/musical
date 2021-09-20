const express = require('express')
const { getLikedSongs,addToLikedSongs } = require('../controllers/likedSongs')
const router = express.Router()

router.get("/likedsongs/:id", getLikedSongs)
router.post("/likedsongs/add/:id", addToLikedSongs)

module.exports = router;