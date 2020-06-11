var Router = require('router');
var renderController = require('../controllers').renderController;

const router = new Router();

router.get('/news', renderController.getNewsPage);
router.get('/images', renderController.getImagePage);
router.get('/videos', renderController.getVideoPage);
router.get('/books', renderController.getDocumentsPage);
router.get('/admin', renderController.getAdminPage);
router.get('/adminMail', renderController.getAdminMail)
router.get('/login', renderController.getLoginPage); //TO BE ADDED: Middleware to check if superuser
router.get('/profile', renderController.getProfilePage);

router.get('/', renderController.getNewsPage);

module.exports = router