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
const getParsedObjectAndCache = async(req, res) => {

    if(req.cachedDB){
        return req.cachedDB;
    }

   let categories = [];
   let news = [];
   
   const country = req.query.country || 'us';
   const baseURL = `https://newsapi.org/v2/top-headlines?apikey=${process.env.NEWS_API_KEY}&pageSize=50`;

   try{
        if(req.query.categories){
            categories = req.query.categories.split(",");
            console.log(categories);
        }

        if(req.id){
            //look for saved rss
        }
        
        if(categories.length > 0){
                //if there are specific conditions for categories
                
                if(req.query.keywords){
                    
                    for(let i=0; i<categories.length; ++i){
                        const newsAPIResp = await axios.get(`${baseURL}&q=${req.query.keywords}&country=${country}&category=${categories[i]}`);

                        news = news.concat(newsAPIResp.data.articles);
                    }
                    
                }else{
                    //if no keywords are selected
                    for(let i=0; i<categories.length; ++i){
                        const newsAPIResp = await axios.get(`${baseURL}&country=${country}&category=${categories[i]}`);

                        news = news.concat(newsAPIResp.data.articles);
                    }
                }                             
        }else{
            //if all categories are required or no category is specified (in that case display only general)
            
            if(req.query.keywords){
                //if search by keywords
                const newsAPIResp = await axios.get(`${baseURL}&q=${req.query.keywords}&country=${country}`);
                
                news = news.concat(newsAPIResp.data.articles);
            }else{
                //if no keywords are selected
                const newsAPIResp = await axios.get(`${baseURL}&country=${country}`);
                
                news = news.concat(newsAPIResp.data.articles);
            }
        }
    
        //sort by publish date (it is necesary when multiple categories are selected)
        news.sort((a, b)=>{
            return (a.publishedAt < b.publishedAt) ? 1 : ((a.publishedAt > b.publishedAt) ? -1 : 0);
        });

        news = news.slice(0, 50);

        const cache = new Cache({
            request: req.originalUrl.replace("/rss", ""),
            response: JSON.stringify(news),
            contentType: 'application/json'
        });

       
        const cacheDB = await req.db.Cache.create(cache);

        return news;

    }catch(err){
        console.error(err);
        return null;
    }
}


const getTrending = async (req, res) => {
   
        const news = await getParsedObjectAndCache(req, res);

        if(news){
            res.writeHead(HttpStatusCodes.OK, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({success: true, news: news}));
        }else{
            res.writeHead(HttpStatusCodes.INTERNAL_SERVER_ERROR, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({
                success: false,
                message: "something bad happened"
            }));
        }
}

const getRSS = async (req, res) => {
    
    const news = await getParsedObjectAndCache(req, res);

    if(news){
        let rssFeed = new RSS({
            title: "BearNews",
            feed_url: req.url,
            site: req.url.hostname,
            guid: 'LawUyjQEXYiF51EzmEpe',
            date: (new Date()).toISOString()
        });
    
        news.forEach(newsPost => {
            rssFeed.item({
                title : newsPost.title,
                description : newsPost.description,
                url : newsPost.url,
                author : newsPost.author,
                date : newsPost.publishedAt,
                custom_elements: [
                    {image_url: newsPost.urlToImage} 
                ]
            })
            
        });
    
    
        res.writeHead(HttpStatusCodes.OK, { 'Content-Type': 'text/xml' });
        return res.end(rssFeed.xml());
    }else{
        res.writeHead(HttpStatusCodes.INTERNAL_SERVER_ERROR, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({
                success: false,
                message: "something bad happened"
            }));
    }  
   
}

module.exports = {
    getTrending,
    getRSS
}