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


const baseURL = `https://api.vimeo.com/categories`;
const config = {
    headers: { Authorization: `Bearer ${process.env.VIMEO_API_KEY}`}
};

const getParsedObjectAndCache = async(req, res) => {
    
    if(req.cachedDB){
        return req.cachedDB;
    }


    let categories = [];
   let videos = [];
   const perPage = 50;
   const config = {
    headers: { Authorization: `Bearer ${process.env.VIMEO_API_KEY}`}
   };



   try{

        if(req.query.categories){
            categories = req.query.categories.split(",");
        }else if(!req.query.categories && !req.query.keywords){
            let listOfCategories = ['animation', 'art', 'cameratechniques', 'comedy', 'documentary', 'experimental', 'fashion', 'food', 'instructionals', 'music', 'narrative', 'personal', 'journalism', 'sports', 'talks', 'travel'];

            for(let i=0; i<3; i++){
                let rand = Math.floor(Math.random()*listOfCategories.length);
                if(categories.includes(listOfCategories[rand])){
                    
                    i--;
                }else{
                    categories.push(listOfCategories[rand]);
                }
            }
        }
        
        
            //if there are specific conditions for categories

            if(categories > 5){
                //we do not accept more than 5 categories (because of money)
                res.writeHead(HttpStatusCodes.BAD_REQUEST, { 'Content-Type': 'application/json' });
                return null;
            }
            
            if(req.query.keywords){
                if(categories.length > 0){
                    for(let i=0; i<categories.length; ++i){
                        const videoAPIResp = await axios.get(`${baseURL}/${categories[i]}/videos?query=${req.query.keywords}&filter=embeddable&filter_embeddable=true&per_page=${perPage}`, config);
                        
                        videos = videos.concat(videoAPIResp.data.data);
                    }
                }else{
                    return null;
                }
                
            }else{
                //if no keywords are selected
                for(let i=0; i<categories.length; ++i){
                    const videoAPIResp = await axios.get(`${baseURL}/${categories[i]}/videos?filter=embeddable&filter_embeddable=true&per_page=${perPage}`, config);
                    
                    videos = videos.concat(videoAPIResp.data.data);
                }
            }                             
        
        
        let unique = [];
        let names = [];

        videos.forEach(video => {
            if(!names.includes(video.name)){
                unique.push(video);
                names.push(video.name);
            }
        });
     
        unique.sort((a, b)=>{
            return (a.modified_time < b.modified_time) ? 1 : ((a.modified_time > b.modified_time) ? -1 : 0);
        });
        unique = unique.slice(0, 30);


        const formattedVideos = [];
        unique.forEach(video => {
            formattedVideos.push({
                name: video.name,
                description: video.description,
                link: video.link,
                html: video.embed.html,
                duration: video.duration,
                created: video.created_time,
                modified: video.modified_time,
                category: video.categories.name,

            });
        });

        const cache = new Cache({
            request: req.originalUrl.replace("/rss", ""),
            response: JSON.stringify(formattedVideos),
            contentType: 'application/json',
            userId: req.session ? req.session._id : null
        });

       
        const cacheDB = await req.db.Cache.create(cache);


        return formattedVideos;
        
    }catch(err){
        console.error(err);
        return null;
    }

}



const getVideos = async (req, res) => {

    let cats = req.query.categories;
    console.log(cats);
    const videos = await getParsedObjectAndCache(req, res);

    if(videos){
        res.writeHead(HttpStatusCodes.OK, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({success: true, videos: videos}));
        
    }else{
        if(cats.split(',').length > 5){
            res.writeHead(HttpStatusCodes.BAD_REQUEST, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({
                success: false,
                message: "Too many categories (max = 5)"
            }));
        }else if(!cats && req.keywords){
            res.writeHead(HttpStatusCodes.BAD_REQUEST, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({
                success: false,
                message: "Please select a category before searching after a keyword"
            }));
        }else{
            res.writeHead(HttpStatusCodes.INTERNAL_SERVER_ERROR, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({
                success: false,
                message: "something bad happened"
            }));
        }
    }

    
}

const getRSS = async (req, res) => {


    const videos = await getParsedObjectAndCache(req, res);

    if(videos){

        let rssFeed = new RSS({
            title: "BearNews",
            feed_url: req.url,
            site: req.url.hostname,
            guid: 'LawUyjQEXYiF51EzmEpe',
            date: (new Date()).toISOString()
        });

        videos.forEach(video => {
            rssFeed.item({
                title : video.name,
                description : video.description,
                url :  video.link,
                author : 'unknown',
                date : video.created_time,
            })
            
        });


        res.writeHead(HttpStatusCodes.OK, { 'Content-Type': 'text/xml' });
        return res.end(rssFeed.xml());
        
    }else{
        if(req.query.categories.split(',').length > 5){
            res.writeHead(HttpStatusCodes.BAD_REQUEST, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({
                success: false,
                message: "Too many categories (max = 5)"
            }));
        }else if(!req.categories && req.keywords){
            res.writeHead(HttpStatusCodes.BAD_REQUEST, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({
                success: false,
                message: "Please select a category before searching after a keyword"
            }));
        }else{
            res.writeHead(HttpStatusCodes.INTERNAL_SERVER_ERROR, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({
                success: false,
                message: "something bad happened"
            }));
        }
    }
    
}

module.exports = {
    getVideos,
    getRSS
}