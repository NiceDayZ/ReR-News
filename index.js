const http = require('http');
const fs = require('fs');
const path = require('path');
const Router = require('router');
const finalhandler = require('finalhandler');
const staticController = require('./controllers').staticController;

const globalRouter = require("./routes");

const controller = require('./controllers');

const router = new Router();

router.use('/', globalRouter);


http.createServer(function (request, response) {
    console.log('request ', request.url);
    const filePath = '.' + request.url;

    if(path.extname(request.url).length == 0){   
      router(request, response, finalhandler(request, response));
    }else{
      request.filePath = filePath;
      staticController.getStaticFiles(request, response);
    }

}).listen(3000);
console.log('Server running at http://127.0.0.1:3000/');