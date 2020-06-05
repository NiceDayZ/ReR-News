const jwt = require('jsonwebtoken');
const HttpStatusCodes = require("http-status-codes");



module.exports = async (req, res, next) => {
    const token = req.headers['x-auth-token'];

    if(!token){
          res.writeHead(HttpStatusCodes.UNAUTHORIZED, { 'Content-Type': 'application/json' });
          return res.end(JSON.stringify({
            success: false,
            message: "Token not found"
          }));
    }

    try{
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;
        next();
    }catch (err){
        res.writeHead(HttpStatusCodes.FORBIDDEN, { 'Content-Type': 'application/json' });
          return res.end(JSON.stringify({
            success: false,
            message: "Invalid Token"
          }));
    }
}