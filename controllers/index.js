const newsController = require("./news");
const imagesController = require("./images");
const staticController = require('./static');
const renderController = require('./render');
const videoController = require('./videos');
const documentsController = require('./documents');
const userController = require('./user');
const validator = require('./validator');

module.exports = {
    newsController,
    staticController,
    renderController,
    imagesController,
    videoController,
    documentsController,
    userController,
    validator
}