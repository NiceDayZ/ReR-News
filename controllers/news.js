//8051447041d249cf907cdc86f15f2462
const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('8051447041d249cf907cdc86f15f2462');
var pug = require('pug');

const getNewsPage = async (req, res) => {
    
    try{
        const newsdata = await newsapi.v2.topHeadlines({
            category: 'technology',
            language: 'en',
            country: 'us'
          })

          const headers = newsdata.articles.slice(0, 10);
          const newsfeed = newsdata.articles.slice(10, newsdata.articles.length);

        res.writeHead(200, { 'Content-Type': 'text/html' });
        var html = pug.renderFile('./views/news.pug', {carousel: headers, newsfeed: newsfeed});
        res.end(html, 'utf-8');
    }catch(err){
        console.log(err);
        //return pug.renderFile('../views/500.pug');
    }
}

module.exports = {
    getNewsPage
}