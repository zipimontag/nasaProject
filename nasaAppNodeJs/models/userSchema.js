const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    userName: {
        type: String,
        require: true
    },
    userPassword: {
        type: String,
        require: true,
        minlength: 8
    },
    pictures: [{
type: mongoose.Schema.Types.ObjectId,
    ref: 'PictureSchema'
    }]
})

module.exports = mongoose.model('UserSchema', userSchema);
