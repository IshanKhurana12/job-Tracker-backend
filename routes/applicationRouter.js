const express= require('express');

const router = express.Router();
const {getall,deleteApplication,getsingle,update,add}= require('../controllers/applicationController.js');

router.get('/',getall);
router.get('/:id',getsingle);
router.post('/add',add);
router.patch('/update/:id',update);
router.delete('/delete/:id',deleteApplication);








module.exports=router;