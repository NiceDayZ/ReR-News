const HttpStatusCodes = require("http-status-codes");
const axios = require('axios');
var RSS = require('rss');
const url = require('url');

//The lines below are for parsing a rss

// let Parser = require('rss-parser');
// let parser = new Parser();

// let feed = await parser.parseURL('http://localhost:3000/api/news/rss?categories=technology,general');
//         console.log(feed.title);
        
//         feed.items.forEach(item => {
//             console.log(item.title + ':' + item.link)
// });



const getImages = async (req, res) => {

   let categories = [];
   let images = [];
   let perPage;
   
   const baseURL = `https://pixabay.com/api?key=${process.env.PIXBAY_API_KEY}`;

   try{
        if(req.query.categories){
            categories = req.query.categories.split(",");
            perPage = Math.floor(200/categories.length) < 20 ? 20 : Math.floor(200/categories.length);
        }else{
            perPage = 200;
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
     
        console.log(images.length)
        res.writeHead(HttpStatusCodes.OK, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify(images));
        
    }catch(err){
        console.error(err);
        res.writeHead(HttpStatusCodes.INTERNAL_SERVER_ERROR, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({
            success: "false",
            message: "something bad happened"
        }));
    }

    
}

const getRSS = async (req, res) => {
    

   const baseURL = `https://newsapi.org/v2/top-headlines?apikey=${process.env.NEWS_API_KEY}&pageSize=50`;

   try{
        
        
    }catch(err){
        console.error(err);
        res.writeHead(HttpStatusCodes.INTERNAL_SERVER_ERROR, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({
            success: "false",
            message: "something bad happened"
        }));
    }
}

module.exports = {
    getImages,
    getRSS
}