const Router = require('router');
const news = require('./news');
const videos = require('./videos');
const documents = require('./documents');
const images = require('./images');
const validator = require('./validator')

const rssParser = require('./rssParser');

const router = Router();

router.use("/news", rssParser, news);
router.use("/videos", videos);
router.use("/books", documents);
router.use("/images", images);
router.use("/validator", validator)

module.exports = router;


