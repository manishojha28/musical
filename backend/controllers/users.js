const User = require("../database/user");
const LikedSongs = require("../database/likedSongs");


exports.signupHandler = async (req, res) => {
    const user = new User(req.body);
    try{
        const savedUser = await user.save()
        const userLikedSongs = new LikedSongs({
            _id: savedUser._id
        })

        const savedLikedSongs = await userLikedSongs.save()

        await LikedSongs.findOne({ _id: savedLikedSongs._id })
        .populate('_id')
        .exec((err, userLiked) => {
            console.log(userLiked)
        })

        res.json({success:true, response: savedUser, savedLikedSongs })
    }
    catch(error) {
        res.json({success: false, 
            message: error.message
        })
    }
}
exports.loginHandler = async (req,res) => {
    const {email, password} = req.body;
    try {
        const user = await User.find({email: email})
        if(!user.length) {
            throw new Error("User does not exist, Signup to enter")
        }
        if( password !== user[0].password) {
            throw new Error("Email and password does not match");
        }
        res.json ({ success: true, message: "Authentication successful", response: user })
    }
    catch (error) {
        res.json({ success: false, message: error.message })
    }
}

exports.getUsersFromDatabase = async (req,res) => {
    try {
        const users = await User.find({})
        res.json({users, success: true})
    }
    catch(err) {
        res.json({success: false, err})
    }
}

exports.findUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        res.json({user, success: true})
    }
    catch(err) {
        res.json({success: false, err})
    }
}