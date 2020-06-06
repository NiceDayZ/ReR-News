const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const HttpStatusCodes = require("http-status-codes");
var nodemailer = require('nodemailer');

const User = require('../models').User;
const Preferences = require('../models').Preference;


const profile = async(req, res) => {
  try{
    const id = req.user._id;
    const user = await req.db.User.findOne({
      _id: id
    }).populate('preferences');

    const objToBeReturned = {
      name: user.name,
      userName: user.userName,
      email: user.email,
      gender: user.gender || null,
      preferences: user.preferences
    }
    res.writeHead(HttpStatusCodes.OK, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({
      success: true,
      user: objToBeReturned
    }));

  }catch{
    console.error(error);
    res.writeHead(HttpStatusCodes.INTERNAL_SERVER_ERROR, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({
        success: false,
        message: "something bad happened"
    }));
  }
  
}

const login = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      const user = await req.db.User.findOne({
        email
      });
  
      if (!user) {
        console.log("User incorrect");
        res.writeHead(HttpStatusCodes.NOT_FOUND, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({
            success: false,
            message: "Email or password incorrect"
        }));
      }

      //check if password is correct
      const validPass = await bcrypt.compare(password, user.password);

      if(!validPass) {
        console.log("Pass incorrect");
        res.writeHead(HttpStatusCodes.NOT_FOUND, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({
            success: false,
            message: "Email or password incorrect"
        }));
      }

      //Create and assign a token
      const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);

      res.writeHead(HttpStatusCodes.OK, { 'Content-Type': 'application/json' });
      console.log("Returning ok");
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


      const createdPreferences = new Preferences();
      const pref = await req.db.Preference.create(createdPreferences);

      //Create a new User using given data from Mobile or Web App
      const createdUser = new User({
        name: req.body.name,
        userName: req.body.userName,
        email: req.body.email,
        password: hashPassword,
        preferences: pref
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
  
     res.writeHead(HttpStatusCodes.OK, { 'Content-Type': 'application/json' });
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
  
        res.writeHead(HttpStatusCodes.OK, { 'Content-Type': 'application/json' });
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

  const getPreferences = async (req, res) => {
    try{
      const id = req.user._id;
      const user = await req.db.User.findOne({
        _id: id
      }).populate("preferences");

      const pref = user.preferences || null;

      res.writeHead(HttpStatusCodes.OK, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({
            success: true,
            preferences: pref
        }));

    }catch(err){
      console.log(err);
      res.writeHead(HttpStatusCodes.INTERNAL_SERVER_ERROR, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({
          success: false,
          message: "something bad happened"
      }));
    }
  }

  const setPreferences = async (req, res) => {

    try{
      const news = req.body.news;
      const images = req.body.images;
      const videos = req.body.videos;
      const books = req.body.books;

      const id = req.user._id;
      const user = await req.db.User.findOne({
          _id: id
      });

      const preff = await req.db.Preference.findOne({
        _id: user.preferences
      });



      const newPref = await req.db.Preference.findOneAndUpdate({
        _id: user.preferences
      },
      {
        newsPref: news || preff.newsPref,
        videosPref: videos || preff.videosPref,
        imagesPref: images || preff.imagesPref,
        booksPref: books || preff.booksPref
      }
      );

        res.writeHead(HttpStatusCodes.OK, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({
            success: true
        }));

  }catch(err){
      console.log(err);
      res.writeHead(HttpStatusCodes.INTERNAL_SERVER_ERROR, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({
          success: false,
          message: "something bad happened"
      }));
  } 
}

const addRSS = async(req, res) => {
  try{

    const id = req.user._id;
    const user = await req.db.User.findOne({
      _id: id
    });

    const preff = await req.db.Preference.findOne({
      _id: user.preferences
    });

    let actualRSS = preff.customRSS;

    const rssToBeAdded = {
      link: req.body.rss,
      enabled: true
    }

    actualRSS.push(rssToBeAdded);

    const newPref = await req.db.Preference.findOneAndUpdate({
      _id: user.preferences
    },
    {
      customRSS: actualRSS
    }
    );

    res.writeHead(HttpStatusCodes.OK, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({
        success: true
    }));

  }catch{
    console.log(err);
      res.writeHead(HttpStatusCodes.INTERNAL_SERVER_ERROR, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({
          success: false,
          message: "something bad happened"
      }));
  }
}

const removeRSS = async(req, res) => {
  try{

    const id = req.user._id;
    const user = await req.db.User.findOne({
      _id: id
    });

    const preff = await req.db.Preference.findOne({
      _id: user.preferences
    });

    let actualRSS = preff.customRSS;
    let newRSSList = [];

    actualRSS.forEach(rssElement => {
      if(rssElement.link != req.body.rss){
        newRSSList.push(rssElement);
      }
    });

    const newPref = await req.db.Preference.findOneAndUpdate({
      _id: user.preferences
    },
    {
      customRSS: newRSSList
    }
    );

    res.writeHead(HttpStatusCodes.OK, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({
        success: true
    }));

  }catch{
    console.log(err);
      res.writeHead(HttpStatusCodes.INTERNAL_SERVER_ERROR, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({
          success: false,
          message: "something bad happened"
      }));
  }
}

const toggleRSS = async(req, res) => {
  try{

    const id = req.user._id;
    const user = await req.db.User.findOne({
      _id: id
    });

    const preff = await req.db.Preference.findOne({
      _id: user.preferences
    });

    let actualRSS = preff.customRSS;
    let newRSSList = [];

    actualRSS.forEach(rssElement => {
      if(rssElement.link == req.body.rss){
        rssElement.enabled = !rssElement.enabled;
      }
      newRSSList.push(rssElement);
    });

    const newPref = await req.db.Preference.findOneAndUpdate({
      _id: user.preferences
    },
    {
      customRSS: newRSSList
    }
    );

    res.writeHead(HttpStatusCodes.OK, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({
        success: true
    }));

  }catch{
    console.log(err);
      res.writeHead(HttpStatusCodes.INTERNAL_SERVER_ERROR, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({
          success: false,
          message: "something bad happened"
      }));
  }
}



const resetProfile = async(req, res) => {
  try{
    const name = req.body.name;
    const userName = req.body.userName;
    const gender = req.body.gender;

    const id = req.user._id;
    const user = await req.db.User.findOne({
        _id: id
    });

    await req.db.User.findOneAndUpdate({
      _id: user._id
      }, {
        name: name || user.name,
        userName: userName || user.userName,
        gender: gender || user.gender
      });

      res.writeHead(HttpStatusCodes.OK, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({
          success: true
      }));

  }catch(err){
    console.log(err);
    res.writeHead(HttpStatusCodes.INTERNAL_SERVER_ERROR, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({
        success: false,
        message: "something bad happened"
    }));
  }
}

const resetPassword = async(req, res) => {
  try{
    const oldPass = req.body.oldPassword;
      const newPass = req.body.newPassword;
      const userId = req.user._id;
      
      const userData = await req.db.User.findOne({
          _id: userId
      });

      const validPass = await bcrypt.compare(oldPass, userData.password);

      if(!validPass) {
        res.writeHead(HttpStatusCodes.UNAUTHORIZED, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({
            success: false,
            message: "Old Password Incorrect"
        }));
      }

      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(newPass, salt);

      await req.db.User.findOneAndUpdate({
          _id: userId
      }, {
          password: hashPassword
      });

      res.writeHead(HttpStatusCodes.OK, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({
          success: true
      }));
  }catch(err){
    console.log(err);
    res.writeHead(HttpStatusCodes.INTERNAL_SERVER_ERROR, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({
        success: false,
        message: "something bad happened"
    }));
  }
}


  module.exports={
      profile,
      login,
      register,
      confirmRegister,
      getPreferences,
      setPreferences,
      addRSS,
      removeRSS,
      toggleRSS,
      resetProfile,
      resetPassword

  }