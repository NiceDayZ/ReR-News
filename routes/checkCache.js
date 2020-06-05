const Cache = require("../models").Cache;
const HttpStatusCodes = require("http-status-codes");


module.exports = async(req, res, next) => {

    const url = req.originalUrl.replace("/rss", "");

    let cache;

    if(req.originalUrl.includes("/news")){
        cache = await req.db.Cache.findOne({
            request: url,
            userId: req.session ? req.session._id : null
        });
    }else{
        cache = await req.db.Cache.findOne({
            request: url,
        });
    }

    


    if(cache){
        if(!req.originalUrl.includes("/news") || (!req.session && !cache.userId) || req.session._id == cache.userId){
            req.cachedDB = JSON.parse(cache.response);
            console.log("returning cached result");
        }
        next();
    }else{
        next();
    }
}