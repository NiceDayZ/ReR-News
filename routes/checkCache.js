const Cache = require("../models").Cache;
const HttpStatusCodes = require("http-status-codes");


module.exports = async(req, res, next) => {

    const url = req.originalUrl.replace("/rss", "");

    const cache = await req.db.Cache.findOne({
        request: url
    });


    if(cache){
        console.log("returning cached result");
        req.cachedDB = JSON.parse(cache.response);
        next();
    }else{
        next();
    }
}