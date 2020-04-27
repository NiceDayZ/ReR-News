const Router = require('router');
const api = require('./api');
const static = require('./static');
const auth = require('./user');
const admin = require('./admin')

const router = Router();

router.use("/page", static);
router.use("/api", api);
router.use("/auth", auth);
router.use("/admin", admin);

module.exports = router;


