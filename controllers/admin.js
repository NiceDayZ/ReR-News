const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const HttpStatusCodes = require("http-status-codes");
var nodemailer = require('nodemailer');

const User = require('../models').User;
const Message = require('../models').Message;
const Preferences = require('../models').Preference;

const getStats = async(req, res) => {
    const users = await req.db.User.find().populate('preferences');
    
    let newsStats = {
        science: 0,
        technology: 0,
        sports: 0,
        business: 0,
        health: 0,
        general: 0
    };
    let imagesStats = {
        backgrounds: 0,
        fashion: 0,
        nature: 0,
        science: 0,
        education: 0,
        feelings: 0,
        health: 0,
        people: 0,
        religion: 0,
        places: 0,
        animals: 0,
        industry: 0,
        computer: 0,
        food: 0,
        sports: 0,
        transportation: 0,
        travel: 0,
        buildings: 0,
        business: 0,
        music: 0
    };
    let videosStats = {
        animation: 0,
        art: 0,
        cameratechniques: 0,
        comedy: 0,
        documentary: 0,
        experimental: 0,
        fashion: 0,
        food: 0,
        instructionals: 0,
        music: 0,
        narrative: 0,
        personal: 0,
        journalism: 0,
        sports: 0,
        talks: 0,
        travel: 0
    };
    let booksStats = {
        comedy: 0,
        adventure: 0,
        drama: 0,
        horror: 0,
        romance: 0,
        action: 0,
        science: 0,
        fiction: 0,
        science_fiction: 0,
        detective: 0,
        biography: 0,
        psychology: 0,
        self_help: 0,
        philosophy: 0,
        arts: 0,
        dictionary: 0,
        parenting: 0,
        poetry: 0,
        critics: 0,
        sport: 0,
        health: 0,
        crime: 0,
        mystery: 0,
        social: 0,
        educational: 0,
        economics: 0
    };
    
    try{
        users.forEach(user => {
            user.preferences.newsPref.forEach(element => {
                if(newsStats[element]){
                    newsStats[element]++;
                }else{
                    newsStats[element] = 1;
                }
            });

            user.preferences.imagesPref.forEach(element => {
                if(imagesStats[element]){
                    imagesStats[element]++;
                }else{
                    imagesStats[element] = 1;
                }
            });

            user.preferences.videosPref.forEach(element => {
                if(videosStats[element]){
                    videosStats[element]++;
                }else{
                    videosStats[element] = 1;
                }
            });

            user.preferences.booksPref.forEach(element => {
                if(booksStats[element]){
                    booksStats[element]++;
                }else{
                    booksStats[element] = 1;
                }
            });
        });

        res.writeHead(HttpStatusCodes.OK, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({
        success: true,
        stats: {
            news: newsStats,
            images: imagesStats,
            videos: videosStats,
            books: booksStats
        }
        }));

    }catch(err){
        console.error(error);
        res.writeHead(HttpStatusCodes.INTERNAL_SERVER_ERROR, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({
            success: false,
            message: "something bad happened"
        }));
    }
}

const getMessages = async(req, res) =>{
    try{
        const mesages = await req.db.Message.find().sort('-createdAt');
        res.writeHead(HttpStatusCodes.OK, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({
            success: true,
            mesages: mesages
        }));
    }catch(err){
        console.error(error);
        res.writeHead(HttpStatusCodes.INTERNAL_SERVER_ERROR, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({
            success: false,
            message: "something bad happened"
        }));
    }
}

const respondToMessage = async(req, res) => {
    try{
        const response = req.body.message;
        const _id = req.body.id;

        const messageInfo = await req.db.Message.findOne({
            _id: _id
        });


        const mailOptions = {
            from: process.env.EMAIL, // sender address
            to: messageInfo.email, // list of receivers //TO BE CHANGED TO user.email
            subject: 'Response to your message', // Subject line
            html: `
            <div class="confirmationWrapper">
            
            <div class="confirmationWrapper">
                <h3>${response}</h3>
                <p><img src="https://rer-umbrella.herokuapp.com/images/fundal-patrat.png" alt="" width="40">
                <span>Best regards,</span>
                <span>UmbrElla Team</span>
            </div>
            
            </div>`// plain text body
    
            
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

        const message = await req.db.Message.findOneAndUpdate({
            _id: _id,
        },
        {
            response: response
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

const grantPermition = async(req,res) => {
    res.writeHead(HttpStatusCodes.OK, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({
        success: true,
    }));
}



module.exports = {
    getStats,
    getMessages,
    respondToMessage,
    grantPermition
}