const HttpStatusCodes = require("http-status-codes");
const axios = require('axios');
const Cache = require('../models').Cache;
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
   const perPage = 40;

   if(req.cachedDB){
        return req.cachedDB;
    }
   
   const baseURL = `https://www.googleapis.com/books/v1/volumes?key=${process.env.DOCS_API_KEY}&langRestrict=en&maxResults=${perPage}`;

   try{
        if(req.query.categories){
            categories = req.query.categories.split(",");
        }else if(!req.query.categories && !req.query.keywords){
            let listOfCategories = ['comedy', 'adventure', 'drama', 'horror', 'romance', 'action', 'science', 'fiction', 'science_fiction', 'detective', 'biography', 'psychology', 'self_help', 'philosophy', 'arts', 'dictionary', 'parenting', 'poetry', 'critics', 'sport', 'health', 'crime', 'mystery', 'social', 'educational', 'economics'];

            for(let i=0; i<5; i++){
                let rand = Math.floor(Math.random()*listOfCategories.length);
                if(categories.includes(listOfCategories[rand])){
                    
                    i--;
                }else{
                    categories.push(listOfCategories[rand]);
                }
            }
        }

        
                //if there are specific conditions for categories
                
                if(req.query.keywords){
                    if(categories.length > 0){
                    
                        for(let i=0; i<categories.length; ++i){
                            console.log(`${baseURL}&q=subject:${categories[i]}_${req.query.keywords}`);
                            const imageAPIResp = await axios.get(`${baseURL}&q=subject:${categories[i]}+${req.query.keywords}`);
                            images = images.concat(imageAPIResp.data.items);
                        }
                     } else {
                        console.log("ceva");
                        const imageAPIResp = await axios.get(`${baseURL}&q=${req.query.keywords}`);
                        images = images.concat(imageAPIResp.data.items);
                     }
                    
                }else{
                    //if no keywords are selected
                    for(let i=0; i<categories.length; ++i){
                        const imageAPIResp = await axios.get(`${baseURL}&q=subject:${categories[i]}`);
                        images = images.concat(imageAPIResp.data.items);
                    }
                }   
                
        let formattedBooks = [];

        if(images[0]){
            images.forEach((book,index) => {
                const bookObj = {
                    title: book.volumeInfo.title,
                    author: book.volumeInfo.authors ? book.volumeInfo.authors[0] : 'unknown',
                    publishedDate: book.volumeInfo.publishedDate,
                    description: book.volumeInfo.description,
                    image: book.volumeInfo.thumbnail,
                    pages: book.volumeInfo.pageCount,
                    link: book.accessInfo.pdf.isAvailable ? book.accessInfo.pdf.acsTokenLink : (book.accessInfo.epub.isAvailable ? book.accessInfo.epub.acsTokenLink : (book.saleInfo.saleability == 'FOR_SALE' ? book.saleInfo.buyLink : null)),
                    preview: book.accessInfo.webReaderLink || null,
                    image: book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : null
                };
                formattedBooks.push(bookObj);
            });
        }
        
       
        formattedBooks = shuffle(formattedBooks);
        formattedBooks = formattedBooks.slice(0, 70);

        const cache = new Cache({
            request: req.originalUrl,
            response: JSON.stringify(formattedBooks),
            contentType: 'application/json',
            userId: req.session ? req.session._id : null
        });

       
        const cacheDB = await req.db.Cache.create(cache);


        
        return formattedBooks;
        
    }catch(err){
        console.error(err);
        return null;
    }
}

const getBooks = async (req, res) => {

   
    const books = await getParsedObjectAndCache(req,res);

    if(books){

        res.writeHead(HttpStatusCodes.OK, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({success: true, books: books}));
        
    }else{
        console.error(err);
        res.writeHead(HttpStatusCodes.INTERNAL_SERVER_ERROR, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({
            success: false,
            message: "something bad happened"
        }));
    }

    
}

const getRSS = async (req, res) => {
    
    const books = await getParsedObjectAndCache(req,res);

    if(books){

        let rssFeed = new RSS({
            title: "BearNews",
            feed_url: req.url,
            site: req.url.hostname,
            guid: 'LawUyjQEXYiF51EzmEpe',
            date: (new Date()).toISOString()
        });

        books.forEach(book => {
            rssFeed.item({
                title : book.title,
                description : book.description,
                url : book.link || book.preview,
                author : book.author,
                date : (new Date()).toISOString(),
                custom_elements: [
                    {image_url: book.image} 
                ]
            })
            
        });

        res.writeHead(HttpStatusCodes.OK, { 'Content-Type': 'text/xml' });
        return res.end(rssFeed.xml());
        
    }else{
        console.error(err);
        res.writeHead(HttpStatusCodes.INTERNAL_SERVER_ERROR, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({
            success: false,
            message: "something bad happened"
        }));
    }

}

module.exports = {
    getBooks,
    getRSS
}