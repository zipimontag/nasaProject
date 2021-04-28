const userSchema = require('../models/UserSchema');
const pictureSchema = require('../models/PictureSchema');


const newPicture = async (req, res) => {
    try {    
        console.log('-------------newPicture');     
        console.log('req.authorization'+JSON.stringify(req.headers['authorization']));
        const user = await userSchema.findOne({userName:req.headers['authorization'].userName , userPassword: req.headers['authorization'].userPassword })
        console.log('user:'+user);
    //  var newPicture={
    //  }
    //         newPicture.date = req.body.date;
    //         newPicture.explanation = req.body.explanation;
    //         newPicture.media_type = req.body.media_type;
    //         newPicture.service_version = req.body.service_version;
    //         newPicture.title = req.body.title;
    //         newPicture.url = req.body.url;
    //         newPicture.user = user._id;
            // console.log('newPicture:'+JSON.stringify(newPicture));

        let picture = new pictureSchema(req.body);
    // let picture = new pictureSchema(req.body);
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
        console.log(JSON.stringify(req.headers['authorization']));
        const userPicture=await userSchema.find({userName:req.headers['authorization'].userName,userPassword:req.headers['authorization'].userPassword}).populate('pictures')
    //     const userPicture=await userSchema.find({userName:req.headers['authorization'].userName,userPassword:req.headers['authorization'].userPassword})
    //    console.log("user:"+JSON.stringify(req.headers['authorization'])._id);
    //    console.log("user:"+userPicture);
    //     console.log(`user.id: ${userPicture._id}`);
    //     const pictures=await pictureSchema.find({user:userPicture._id})
    //     console.log('get all pictures');
        console.log('pictures'+userPicture);
        res.status(200).json({pictures:userPicture})
    }
    catch(err){
        res.status(500).send('error:'+error)
    }
}

module.exports={newPicture,getAllPicture}