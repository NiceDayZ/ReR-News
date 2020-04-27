var Router = require('router');


const router = new Router();

router.post('/login', newsController.getNewsPage);
router.post('/register', newsController.getNewsPage);
router.post('/forgotPassword', newsController.getNewsPage);
router.post('/changePassword', newsController.getNewsPage);


module.exports = router