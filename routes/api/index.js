const Router = require('router');
const news = require('./news');
const videos = require('./videos');
const documents = require('./documents');
const images = require('./images');

const router = Router();

router.use("/news", news);
router.use("/videos", videos);
router.use("/documents", documents);
router.use("/images", images);

module.exports = router;


