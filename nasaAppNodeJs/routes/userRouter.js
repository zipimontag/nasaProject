const router=require('express').Router();
const user=require('../controllers/userController');
router.post('/createUser',user.createUser)
router.post('/getLoginUser',user.getLoginUser );
router.post('/getAllUsers',user.getAllUsers );
module.exports=router;