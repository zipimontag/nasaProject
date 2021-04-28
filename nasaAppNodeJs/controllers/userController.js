const userSchema = require('../models/UserSchema');
const jwt = require('jsonwebtoken');
const pictureSchema = require('../models/PictureSchema');
const createUser = async (req, res) => {
    try {
        const findUser = await userSchema.find({ userName: req.body.userName, userPassword: req.body.userPassword })
        if (findUser.length !== 0)
            return res.status(500).send('this user is already register');
        const newUser = new userSchema(req.body);
        await newUser.save();
        const token = jwt.sign({ userName: req.body.userName, userPassword: req.body.userPassword }, process.env.SECRET);
        res.status(200).json({ token: token });
    }
    catch (err) {
        res.status(500).send("Error: " + err);
    }
    console.log("createUser");
}

// const pushPicture = async (user) => {
//     try {
//         const data = await requestApi('ZEHEWA48HHvGZIzRlpweaarCj6HEdEcvHt7sJdjp');
//         const pictureDetails = JSON.parse(data);
//         const newPictures = new pictureSchema(pictureDetails)
//         await newPictures.save();
//         user.pictures.push(newPictures);
//         await user.save();
//     }
//     catch (err) {
//         console.log('can not push picture');
//     }

// }

const getLoginUser = async (req, res) => {
    try {
        console.log('login user');
        let loginUser = await userSchema.find({ userName: req.body.userName, userPassword: req.body.userPassword })
        console.log(req.body.userPassword);
        if (loginUser.length!==0) {
            console.log(loginUser);
            const token = jwt.sign({userName:req.body.userName, userPassword: req.body.userPassword }, process.env.SECRET);
            console.log('you find');
            console.log('token: '+token);
           return res.status(200).json({ myToken: token });
        }
        res.status(404).send('register first');
    }
    catch (err) {
        res.status(500).send("Error: " + err);
    }
}

const getAllUsers = async (req, res) => {
    try {
        const users = await userSchema.find().populate('pictures')
        res.status(200).json({ users: users })
    }
    catch (err) {
        res.status(500).send('error')
    }
}
const getAllPicturesForUser = async (req, res) => {
    try {
        let user = await userSchema.findOne({ userPassword: req.params.userPassword }).populate('pictures')
        if (user)
            res.status(200).json({ pictures: user.pictures })
        else
            res.status(200).send('could not found')
    }
    catch (err) {
        res.status(500).send('error')
    }
}

module.exports = { createUser, getLoginUser,getAllUsers}