const Router = require('router');
const validator = require("../../controllers").validator;


const router = Router();

router.post("/rss", validator.validateRSS);


module.exports = router;
