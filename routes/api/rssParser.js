let Parser = require('rss-parser');
const HttpStatusCodes = require("http-status-codes");
const User = require('../../models').User;

var problems = false;

let parser = new Parser();

module.exports = async (req, res, next) => {

    try{


        let parsedNews = [];   
            
        if(req.session){
            const user = req.session;
   
            let listOfRSSPromises = [];
            let listOfRSSParsed = [];

            // user.preferences.customRSS.forEach(customRSS => {
            //     if(customRSS.enabled){
            //         const url = customRSS.link;
            //         const parsedPromise = parser.parseURL(url);
            //         listOfRSSPromises.push(parsedPromise);
            //     }
            // });

            for(let i=0; i<user.preferences.customRSS.length; i++){
                if(user.preferences.customRSS[i].enabled){
                    console.log(user.preferences.customRSS[i].link);
                    const url = user.preferences.customRSS[i].link;

                    try{
                        const parsed = await parser.parseURL(url);
                        listOfRSSParsed.push(parsed);
                    }catch(err){
                        console.log(err);
                    }

                }
            }
            
            // listOfRSSParsed = await Promise.all(listOfRSSPromises);


            listOfRSSParsed.forEach(feed => {
                feed.items.forEach(item => {
                    parsedNews.push({
                        source: {
                            id: feed.title,
                            name: feed.title
                        },
                        author: item.creator || feed.title ||null,
                        title: item.title,
                        description: item.content,
                        url: item.link,
                        urlToImage: '/images/1.jpg',
                        publishedAt: item.isoDate,
                        content: item.content
                    })
                }); 
            });

        }

        req.newsParsed = parsedNews;
        next();

    }catch(err){
        res.writeHead(HttpStatusCodes.INTERNAL_SERVER_ERROR, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({
            success: false,
            message: "something bad happened"
        }));
    }
}