var Router = require('router');

const newsController = require("../controllers").newsController;

const router = new Router();

router.get('/', newsController.getNewsPage);


module.exports = router
