const Router = require('router');
const imagesController = require("../../controllers").imagesController;


const router = Router();

router.get("/", imagesController.getImages);
router.get("/rss", imagesController.getRSS);


module.exports = router;
