const Router = require('router');
const videoController = require("../../controllers").videoController;


const router = Router();

router.get("/", videoController.getVideos);
router.get("/rss", videoController.getRSS);


module.exports = router;
