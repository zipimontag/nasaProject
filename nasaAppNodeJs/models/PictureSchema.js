const mongoose=require('mongoose');


const pictureSchema=mongoose.Schema({
    date:{
        type:String,
    },
    explanation:{
        type:String
    },
    media_type:{
        type:String
    },
    service_version:{
        type:String
    },
    title:{
        type:String
    },
    url:{
        type:String
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'UserSchema'

    }
})
module.exports=mongoose.model('PictureSchema',pictureSchema)