var Router = require('router');


const router = new Router();


const checkIfSuperUser = require("./checkIfSuperUser");
const adminController = require('../controllers').adminController;

router.get('/stats', checkIfSuperUser, adminController.getStats);
router.get('/messages', checkIfSuperUser, adminController.getMessages);
router.put('/messages', checkIfSuperUser, adminController.respondToMessage);


module.exports = router;