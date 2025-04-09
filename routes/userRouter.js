const express= require('express');

const {home}=require('../controllers/userController');

const {signup,login}=require('../controllers/userController');
const router = express.Router();


router.get('/',home) ;

router.post('/signup',signup);

router.post('/login',login)

module.exports=router;

