const Router = require('router');
const api = require('./api/');
const static = require('./render');
const user = require('./user');
var renderController = require('../controllers').renderController;

const admin = require('./admin')

const checkCaching = require('./checkCache');
const checkSession = require('./checkSession')

const router = Router();


router.use("/api", checkSession, checkCaching, api);
router.use("/user", user);
router.use("/", static);
router.use("/admin", admin);

module.exports = router;


