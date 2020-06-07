const http = require('http');
const path = require('path');
const Router = require('router');
const finalhandler = require('finalhandler');
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require('cors');
const url = require('url');
const schedule = require('node-schedule');

const Cache = require('./models').Cache;


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

const db = require("./models");



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

//router.use(cors({credentials: true, origin: "*", allowedHeaders : ['x-auth-token', 'Content-Type', 'Access-Control-Allow-Headers', 'Authorization', 'X-Requested-With'], exposedHeaders : ['x-auth-token','Content-Type', 'Access-Control-Allow-Headers', 'Authorization', 'X-Requested-With'], methods : "GET,PUT,PATCH,POST,DELETE,OPTIONS"}));


 router.use(function(req, res, next) {
   res.setHeader("Access-Control-Allow-Origin", "*");
   res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-auth-token, x-request-id, x-forwarded-for, x-forwarded-proto, x-forwarded-port, via, connect-time, x-request-start, total-route-time, content-length, accept-language, accept-encoding, user-agent, sec-fetch-dest, sec-fetch-site, sec-fetch-mode, origin, access-control-request-headers, access-control-request-method");
   next();
 });

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended:true }));

router.use((req, res, next) => {
    req.db = db;
    next();
});
router.use((req, res, next) => {
  req.query = url.parse(req.url,true).query;
  next();
});
router.use('/', globalRouter);



//Scheduled JOBS
var invalidateCache = schedule.scheduleJob('*/5 * * * *', async() => {
  try{
      const cursor = Cache.find().cursor();
      console.log("Auto scheduled job. Invalidating Cache");
      for (let cache = await cursor.next(); cache != null; cache = await cursor.next()) {
          if(Date.now() - cache.createdAt.getTime() > (1000 * 60 * 30)){
              await db.Cache.findByIdAndDelete({ 
                  _id: cache._id
              });
          }
      }
  }catch(err){
      console.error(err);
  }
});


http.createServer(function (request, response) {
    console.log('request ', request.url);
    const filePath = '.' + request.url;

    if(path.extname(request.url).length == 0 || path.extname(request.url).length > 10){

      router(request, response, finalhandler(request, response));
    }else{
      request.filePath = filePath.replace("/pages", "");
      staticController.getStaticFiles(request, response);
    }

}).listen(PORT);
console.log(`Server running at localhost:${PORT}/`);