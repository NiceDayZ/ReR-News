
let Parser = require('rss-parser');
const HttpStatusCodes = require("http-status-codes");

let parser = new Parser();


const validateRSS = async(req, res) => {
    try{
        const url = req.body.rssFeed;
        const feed = await parser.parseURL(url);
        res.writeHead(HttpStatusCodes.OK, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({success: true}));
    }catch(err){
        console.log(err);
        res.writeHead(HttpStatusCodes.NOT_ACCEPTABLE, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({
            success: false,
            message: "Invalid RSS"
        }));
    }
}

module.exports = {
    validateRSS
}