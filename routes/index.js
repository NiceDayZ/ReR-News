const Router = require('router');
const news = require('./news');

const router = Router();

router.use("/", news);

module.exports = router;


