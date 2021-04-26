const router = require('express').Router();
const jwt = require('jsonwebtoken');
const picture = require('../controllers/pictureControllers');


router.use((req, res, next) => {
    const decoded = jwt.verify(req.headers['authorization'], process.env.SECRET);
    req.headers['authorization'] = decoded;
    console.log('################jwt:'+JSON.stringify(req.headers['authorization']));

    next();
})

router.post('/newPicture',picture.newPicture);
router.post('/getAllPicture',picture.getAllPicture);

module.exports=router;