let Parser = require('rss-parser');
const HttpStatusCodes = require("http-status-codes");
const User = require('../../models').User;


let parser = new Parser();

module.exports = async (req, res, next) => {

    try{


        let parsedNews = [];   
            
        if(req.session){
            const user = req.session;
   
            let listOfRSSPromises = [];
            user.preferences.customRSS.forEach(customRSS => {
                if(customRSS.enabled){
                    const url = req.body.rssFeed;
                    listOfRSSPromises.push(parser.parseURL(url));
                }
            });

            
            listOfRSSParsed = await Promise.all(listOfRSSPromises);


            listOfRSSParsed.forEach(feed => {
                feed.items.forEach(item => {
                    parsedNews.push({
                        source: {
                            id: feed.title,
                            name: feed.title
                        },
                        author: item.creator,
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
        console.log(err);
        res.writeHead(HttpStatusCodes.NOT_ACCEPTABLE, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({
            success: false,
            message: "Invalid RSS"
        }));
    }

}