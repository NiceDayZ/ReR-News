const Router = require('router');
const api = require('./api/');
const static = require('./render');
const user = require('./user');
//const admin = require('./admin')

const checkCaching = require('./checkCache');

const router = Router();

router.use("/pages", static);
router.use("/api", checkCaching, api);
router.use("/user", user);
//router.use("/admin", admin);

module.exports = router;


