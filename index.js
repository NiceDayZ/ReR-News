const http = require('http');
const path = require('path');
const Router = require('router');
const finalhandler = require('finalhandler');
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
var cors = require('cors');
const staticController = require('./controllers').staticController;
const globalRouter = require("./routes");

const ENV = process.env.NODE_ENV || 'dev';
const PORT = process.env.PORT || 3000;

const config = dotenv.config({
  path: `./configs/${ENV}.env`
}).parsed;

mongoose.connect(process.env.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex:true,
  useFindAndModify: false
}).then(() => console.log("Succesfully connected to DB"));



const router = new Router();

// router.use((req, res, next) => {
//   let body = '';
//     req.on('data', chunk => {
//         body += chunk.toString(); // convert Buffer to string
//     });
//     req.on('end', () => {
//         req.body = body;
//         next();
//     });
// });

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended:true }));
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

}).listen(PORT);
console.log(`Server running at localhost:${PORT}/`);