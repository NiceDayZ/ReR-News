var Router = require('router');


const router = new Router();

//TO BE ADDED: Middleware to check if superuser

router.get('/stats', newsController.getNewsPage);
router.get('/messages', newsController.getNewsPage);
router.post('/respond', newsController.getNewsPage);


module.exports = router;