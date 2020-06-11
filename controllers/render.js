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
        res.writeHead(200, { 'Content-Type': 'text/html' });
        var html = pug.renderFile('./views/images.pug');
        res.end(html, 'utf-8');
    }catch(err){
        console.log(err);
        //return pug.renderFile('../views/500.pug');
    }
}

const getVideoPage = async (req, res) => {
    try{
        res.writeHead(200, { 'Content-Type': 'text/html' });
        var html = pug.renderFile('./views/videos.pug');
        res.end(html, 'utf-8');
    }catch(err){
        console.log(err);
        //return pug.renderFile('../views/500.pug');
    }
}

const getDocumentsPage = async (req, res) => {
    try{
        res.writeHead(200, { 'Content-Type': 'text/html' });
        var html = pug.renderFile('./views/books.pug');
        res.end(html, 'utf-8');
    }catch(err){
        console.log(err);
        //return pug.renderFile('../views/500.pug');
    }
}

const getAdminPage = async (req, res) => {
    try{
        res.writeHead(200, { 'Content-Type': 'text/html' });
        var html = pug.renderFile('./views/admin.pug');
        res.end(html, 'utf-8');
    }catch(err){
        console.log(err);
        //return pug.renderFile('../views/500.pug');
    }
}

const getAdminMail = async (req, res) => {
    try{
        res.writeHead(200, { 'Content-Type': 'text/html' });
        var html = pug.renderFile('./views/adminMessages.pug');
        res.end(html, 'utf-8');
    }catch(err){
        console.log(err);
        //return pug.renderFile('../views/500.pug');
    }
}

const getAdminStats = async (req, res) => {
    try{
        res.writeHead(200, { 'Content-Type': 'text/html' });
        var html = pug.renderFile('./views/admin.pug');
        res.end(html, 'utf-8');
    }catch(err){
        console.log(err);
        //return pug.renderFile('../views/500.pug');
    }
}

const getProfilePage = async (req, res) => {
    try{
        res.writeHead(200, { 'Content-Type': 'text/html' });
        var html = pug.renderFile('./views/profile.pug');
        res.end(html, 'utf-8');
    }catch(err){
        console.log(err);
        //return pug.renderFile('../views/500.pug');
    }
}

const getLoginPage = async (req, res) => {
    try{
        res.writeHead(200, { 'Content-Type': 'text/html' });
        var html = pug.renderFile('./views/login.pug');
        res.end(html, 'utf-8');
    }catch(err){
        console.log(err);
        //return pug.renderFile('../views/500.pug');
    }
}

module.exports = {
    getNewsPage,
    getImagePage,
    getAdminPage,
    getAdminMail,
    getDocumentsPage,
    getLoginPage,
    getProfilePage,
    getVideoPage
}