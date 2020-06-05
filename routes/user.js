var Router = require('router');
const userController = require("../controllers").userController;

const verifyEmail = require("./verifyEmail")
const verifyToken = require("./verifyToken");


const router = new Router();

router.get('/confirmRegister/:token', userController.confirmRegister);
router.get('/profile', verifyToken, userController.profile);
router.get('/preferences', verifyToken, userController.getPreferences);

router.post('/login', verifyEmail, userController.login);
router.post('/register', userController.register);
router.post('/changePassword', verifyToken, userController.resetPassword);

router.put('/profile', verifyToken, userController.resetProfile);
router.put('/preferences', verifyToken, userController.setPreferences)
router.put('/rss', verifyToken, userController.addRSS);

router.patch('/rss', verifyToken, userController.toggleRSS);

router.delete('/rss', verifyToken, userController.removeRSS);


module.exports = router