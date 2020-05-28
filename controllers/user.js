const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const HttpStatusCodes = require("http-status-codes");
var nodemailer = require('nodemailer');

const User = require('../models').User;


const login = async (req, res) => {
    console.log(req.body);
    try {
      const { email, password } = req.body;
  
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

      //check if password is correct
      const validPass = await bcrypt.compare(password, user.password);

      if(!validPass) {
        res.writeHead(HttpStatusCodes.NOT_FOUND, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({
            success: false,
            message: "Email or password incorrect"
        }));
      }

      //Create and assign a token
      const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);

      res.writeHead(HttpStatusCodes.NOT_FOUND, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({
          success: true,
          token: token
      }));
    } catch (error) {
      console.error(error);
      res.writeHead(HttpStatusCodes.INTERNAL_SERVER_ERROR, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({
          success: false,
          message: "something bad happened"
      }));
    }
  };

  const register = async (req, res) => {
    
    //Check if the user is already in the database. If not send 409 Conflict and reject request
    try {
      const existingUser = await req.db.User.findOne({
        email: req.body.email
      })
  
      if (existingUser) {
        res.writeHead(HttpStatusCodes.CONFLICT, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({
            success: false,
            message: "User already exists"
        }));
      }

      //Hash passwords
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(req.body.password, salt);

      //Create a new User using given data from Mobile or Web App
      const createdUser = new User({
        name: req.body.name,
        userName: req.body.userName,
        email: req.body.email,
        password: hashPassword,
      });
  
      const user = await req.db.User.create(createdUser);

      const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET_EMAIL);


      //sendConfirmationMail
      const mailOptions = {
        from: process.env.EMAIL, // sender address
        to: user.email, // list of receivers //TO BE CHANGED TO user.email
        subject: 'Umbrella Email Verification', // Subject line
        html: `<h3>Welcome to Umbrella. Please confirm your email address by clicking this <a href="${process.env.API_URL}/user/confirmRegister/${token}">link</a></h3>`// plain text body
      };

      var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
               user: process.env.EMAIL,
               pass: process.env.EMAIL_SECRET
           }
       });

      transporter.sendMail(mailOptions, function (err, info) {
        if(err){
          console.log(err)
        }
      });
  
     res.writeHead(HttpStatusCodes.NOT_FOUND, { 'Content-Type': 'application/json' });
     return res.end(JSON.stringify({
         success: true,
     }));
    } catch (error) {
      console.error(error);
      res.writeHead(HttpStatusCodes.INTERNAL_SERVER_ERROR, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({
            success: false,
            message: "something bad happened"
        }));
    }
  };

  const confirmRegister = async (req,res) => {

    try{
      const token = req.params.token;
      const verified = jwt.verify(token, process.env.TOKEN_SECRET_EMAIL);
  
      await req.db.User.findOneAndUpdate({
        _id: verified._id
        }, {
            confirmationStatus: true
        });
  
        res.writeHead(HttpStatusCodes.NOT_FOUND, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({
            success: true,
        }));
  
    }catch(err){
      console.error(err);
      res.writeHead(HttpStatusCodes.INTERNAL_SERVER_ERROR, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({
          success: false,
          message: "something bad happened"
      }));
    }
  }


  module.exports={
      login,
      register,
      confirmRegister
  }