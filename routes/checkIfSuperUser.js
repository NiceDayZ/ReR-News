const jwt = require('jsonwebtoken');
const HttpStatusCodes = require("http-status-codes");
const User = require('../models').User;




module.exports = async (req, res, next) => {
    const token = req.headers['x-auth-token'];

    try{
        if(token){
            const verified = jwt.verify(token, process.env.TOKEN_SECRET);
            const user = await req.db.User.findOne({
                _id: verified._id
            });

            if(user.superUser){
                next();
            }else{
                res.writeHead(HttpStatusCodes.FORBIDDEN, { 'Content-Type': 'application/json' });
                return res.end(JSON.stringify({
                    success: false,
                    message: "You are not authorized to see this information"
                }));
            }
        }else{
                res.writeHead(HttpStatusCodes.UNAUTHORIZED, { 'Content-Type': 'application/json' });
                return res.end(JSON.stringify({
                  success: false,
                  message: "You are not authorized to see this information"
                }));
        }

        
    }catch (err){
        res.writeHead(HttpStatusCodes.FORBIDDEN, { 'Content-Type': 'application/json' });
          return res.end(JSON.stringify({
            success: false,
            message: "Invalid Token"
          }));
    }
}