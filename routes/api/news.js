const Router = require('router');
const newsController = require("../../controllers").newsController;


const router = Router();

router.get("/", newsController.getTrending);
router.get("/rss", newsController.getRSS);


module.exports = router;
