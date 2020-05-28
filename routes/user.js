var Router = require('router');
const userController = require("../controllers").userController;

const verifyEmail = require("./verifyEmail")


const router = new Router();

router.get('/confirmRegister/:token', userController.confirmRegister);

router.post('/login', verifyEmail, userController.login);
router.post('/register', userController.register);
//router.post('/changePassword', newsController.getNewsPage);


module.exports = router