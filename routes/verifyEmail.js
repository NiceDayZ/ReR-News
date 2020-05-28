const User = require('../models').User;
const HttpStatusCodes = require("http-status-codes");


module.exports = async (req, res, next) => {
  console.log(req.body);
  const email = req.body.email;
  try{
    const user = await req.db.User.findOne({
      email
    });

    if (!user) {
        res.writeHead(HttpStatusCodes.NOT_FOUND, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({
            success: false,
            message: "Email or password incorrect"
        }));
    }
    
    if(!user.confirmationStatus){
        res.writeHead(HttpStatusCodes.FORBIDDEN, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({
            success: false,
            message: "Email not confirmed yet"
        }));
    }else{
      next();
    }
  }catch(error){
      console.error(error);
      res.writeHead(HttpStatusCodes.INTERNAL_SERVER_ERROR, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({
            success: false,
            message: "something bad happened"
        }));
  }
}  