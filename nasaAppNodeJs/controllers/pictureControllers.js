const userSchema = require('../models/UserSchema');
const pictureSchema = require('../models/PictureSchema');


const newPicture = async (req, res) => {
    try {    
        console.log('-------------newPicture');     
        console.log('req.authorization'+JSON.stringify(req.headers['authorization']));
        const user = await userSchema.findOne({userName:JSON.stringify(req.headers['authorization']).userName , userPassword: JSON.stringify(req.headers['authorization']).userPassword })
        console.log('user:'+user);
     var newPicture={
     }
            newPicture.date = req.body.date;
            newPicture.explanation = req.body.explanation;
            newPicture.media_type = req.body.media_type;
            newPicture.service_version = req.body.service_version;
            newPicture.title = req.body.title;
            newPicture.url = req.body.url;
            newPicture.user = user._id;
            // console.log('newPicture:'+JSON.stringify(newPicture));

        let picture = new pictureSchema(newPicture);
        picture.user=user._id;
        console.log('picture:'+picture);
        await picture.save();
        user.pictures.push(picture._id);
        await user.save();
        console.log('user after update:'+user);

        res.status(200).send('new picture' + picture);
    }
    catch (err) {
        res.status(500).send("error:" + err)
    }
}
    
const getAllPicture=async(req,res)=>{
    console.log('get all pictures');
    try{
        const userPicture=await userSchema.find({userName:JSON.stringify(req.headers['authorization']).userName,userPassword:JSON.stringify(req.headers['authorization']).userPassword}).populate('pictures')
        console.log('get all pictures');
        res.status(200).json({pictures:userPicture})
    }
    catch(err){
        res.status(500).send('error:'+error)
    }
}

module.exports={newPicture,getAllPicture}