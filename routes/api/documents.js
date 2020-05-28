const Router = require('router');
const documentsController = require("../../controllers").documentsController;


const router = Router();

router.get("/", documentsController.getBooks);
router.get("/rss", documentsController.getRSS);


module.exports = router;
