const HttpStatusCodes = require("http-status-codes");
const axios = require('axios');
var RSS = require('rss');
const url = require('url');
const Cache = require('../models').Cache;


//The lines below are for parsing a rss

// let Parser = require('rss-parser');
// let parser = new Parser();

// let feed = await parser.parseURL('http://localhost:3000/api/news/rss?categories=technology,general');
//         console.log(feed.title);
        
//         feed.items.forEach(item => {
//             console.log(item.title + ':' + item.link)
// });

function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}

const getParsedObjectAndCache = async(req, res) => {

    let categories = [];
    let images = [];
    const perPage = 200;

    if(req.cachedDB){
        return req.cachedDB;
    }
    
    const baseURL = `https://pixabay.com/api?key=${process.env.PIXBAY_API_KEY}&safesearch=true`;
 
    try{
         if(req.query.categories){
             categories = req.query.categories.split(",");
         }
 
         if(req.id){
             //look for saved rss
         }
         
         if(categories.length > 0){
                 //if there are specific conditions for categories
                 
                 if(req.query.keywords){
                     
                     for(let i=0; i<categories.length; ++i){
                         const imageAPIResp = await axios.get(`${baseURL}&q=${req.query.keywords}&category=${categories[i]}&per_page=${perPage}`);
 
                         images = images.concat(imageAPIResp.data.hits);
                     }
                     
                 }else{
                     //if no keywords are selected
                     for(let i=0; i<categories.length; ++i){
 
                         const imageAPIResp = await axios.get(`${baseURL}&category=${categories[i]}&per_page=${perPage}`);
 
                         images = images.concat(imageAPIResp.data.hits);
                     }
                 }                             
         }else{
             //if all categories are required or no category is specified (in that case display all categories)
             
             if(req.query.keywords){
                 //if search by keywords
                 const imageAPIResp = await axios.get(`${baseURL}&q=${req.query.keywords}&per_page=${perPage}`);
                 
                 images = images.concat(imageAPIResp.data.hits);
             }else{
                 //if no keywords are selected
                 const imageAPIResp = await axios.get(`${baseURL}&per_page=${perPage}`);
                 
                 images = images.concat(imageAPIResp.data.hits);
             }
         }
      
         images = shuffle(images);
         images = images.slice(0, 200);
 
         const cache = new Cache({
             request: req.originalUrl.replace("/rss", ""),
             response: JSON.stringify(images),
             contentType: 'application/json',
             userId: req.session ? req.session._id : null
         });
 
         const cacheDB = await req.db.Cache.create(cache);
 
         
         return images
         
     }catch(err){
         console.error(err);
         return null;
     }

}

const getImages = async (req, res) => {

   
        const images = await getParsedObjectAndCache(req, res);

        if(images){
            res.writeHead(HttpStatusCodes.OK, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({success: true, images: images}));
        }else{       
            res.writeHead(HttpStatusCodes.INTERNAL_SERVER_ERROR, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({
                success: false,
                message: "something bad happened"
            }))
        }

}

const getRSS = async (req, res) => {
    

    
        const images = await getParsedObjectAndCache(req, res);

        if(images){
            let rssFeed = new RSS({
                title: "BearNews",
                feed_url: req.url,
                site: req.url.hostname,
                guid: 'LawUyjQEXYiF51EzmEpe',
                date: (new Date()).toISOString()
            });
    
            images.forEach(image => {
                rssFeed.item({
                    title : image.photo,
                    description : image.tags,
                    url : image.largeImageURL,
                    author : image.user,
                    date : (new Date()).toISOString(),
                })
                
            });

            res.writeHead(HttpStatusCodes.OK, { 'Content-Type': 'text/xml' });
            return res.end(rssFeed.xml());
        }else{
            res.writeHead(HttpStatusCodes.INTERNAL_SERVER_ERROR, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({
                success: false,
                message: "something bad happened"
            }))
        }
       



        
    
}

module.exports = {
    getImages,
    getRSS
}