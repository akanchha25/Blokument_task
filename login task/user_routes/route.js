const { Router } = require('express');
const controller = require('../controllers/user');

const router = Router();

router.post('/', controller.register);
router.post('/', controller.login);
router.get('/',controller.varifyToken,controller.mydetail);




module.exports = router;
