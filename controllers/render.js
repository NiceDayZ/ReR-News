var pug = require('pug');

const getNewsPage = async (req, res) => {
    
    try{
        res.writeHead(200, { 'Content-Type': 'text/html' });
        var html = pug.renderFile('./views/news.pug');
        res.end(html, 'utf-8');
    }catch(err){
        console.log(err);
        //return pug.renderFile('../views/500.pug');
    }
}

const getImagePage = async (req, res) => {
    try{
        
    }catch(err){

    }
}

const getVideoPage = async (req, res) => {
    try{

    }catch(err){

    }
}

const getDocumentsPage = async (req, res) => {
    try{

    }catch(err){

    }
}

const getAdminPage = async (req, res) => {
    try{

    }catch(err){

    }
}

const getProfilePage = async (req, res) => {
    try{

    }catch(err){

    }
}

const getLoginPage = async (req, res) => {
    try{

    }catch(err){

    }
}

module.exports = {
    getNewsPage,
    getImagePage,
    getAdminPage,
    getDocumentsPage,
    getLoginPage,
    getProfilePage,
    getVideoPage
}