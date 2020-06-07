var isLoading = true;
var lastRequest = '';

function populateTrending(news){
    let slider = document.getElementById("trending-slider");
    slider.innerHTML = '';

    

    let subTitle = document.createElement("H1");
    subTitle.classList.add("slider-title");
    subTitle.innerHTML = "Trending";

    let leftArrow = document.createElement("I");
    leftArrow.classList.add("fas");
    leftArrow.classList.add("fa-chevron-left");
    leftArrow.classList.add("prev");
    leftArrow.id = "prevButton";

    let rightArrow = document.createElement("I");
    rightArrow.classList.add("fas");
    rightArrow.classList.add("fa-chevron-right");
    rightArrow.classList.add("next");
    rightArrow.id = "nextButton";

    var wrapper = document.createElement("DIV");
    wrapper.classList.add("post-wrapper")

    news.forEach(element => {
        let singlepost = document.createElement("DIV");
        singlepost.classList.add("post");

        let image = document.createElement("IMG");
        image.classList.add("slider-image");
        image.setAttribute("src", element.urlToImage);
        image.setAttribute("alt", "Post Image");

        let postInfo = document.createElement("DIV");
        postInfo.classList.add("post-info");

        let title = document.createElement("H4");
        let titleAnchor = document.createElement("A");
        titleAnchor.setAttribute("href", element.url);
        titleAnchor.setAttribute("target", "_blank");
        if(element.title.length < 85){
            titleAnchor.innerHTML = element.title;
        }else{
            titleAnchor.innerHTML = element.title.substr(0, 83) + "...";
        }
        

        let author = document.createElement("I");
        author.classList.add("far");
        author.classList.add("fa-user");
        if(!element.author || element.author.length < 20){
            author.innerHTML = element.author || 'Unknown';
        }else{
            author.innerHTML = element.author.substr(0, 20) + "...";
        }

        let date = document.createElement("I");
        date.classList.add("far");
        date.classList.add("fa-calendar");
        date.innerHTML = element.publishedAt;

        title.appendChild(titleAnchor);
        
        postInfo.appendChild(title);
        postInfo.appendChild(author);
        postInfo.appendChild(date);

        singlepost.appendChild(image);
        singlepost.appendChild(postInfo);

        wrapper.appendChild(singlepost);

    });

    slider.appendChild(subTitle);
    slider.appendChild(leftArrow);
    slider.appendChild(rightArrow);
    slider.appendChild(wrapper);

    loadButtons();
    
}

function populateRecent(news){
    let recent = document.getElementById("recent-posts");
    recent.innerHTML = '';

    let headerText = document.createElement("H1");
    headerText.classList.add(".recent-posts-title");
    headerText.innerHTML = "Recent News";

    recent.appendChild(headerText);

    news.forEach(element => {
        let singlepost = document.createElement("DIV");
        singlepost.classList.add("blog-post");

        let imgcontainer = document.createElement("DIV");
        imgcontainer.classList.add("blog-post__img");

        let singlepostimg = document.createElement("IMG");
        singlepostimg.setAttribute("src", element.urlToImage);
        singlepost.setAttribute("alt", "Post Image");

        let blogPostInfo = document.createElement("DIV");
        blogPostInfo.classList.add("blog-post__info");

        let blogPostDate = document.createElement("DIV");
        blogPostDate.classList.add("blog-post__date");

        let blogPostDateSpan = document.createElement("SPAN");
        blogPostDateSpan.innerHTML = element.publishedAt;

        let blogPostTitle = document.createElement("H2");
        blogPostTitle.classList.add("blog-post__title");
        blogPostTitle.innerHTML = element.title;

        let blogPostDesc = document.createElement("P");
        blogPostDesc.classList.add("blog-post__text");
        blogPostDesc.innerHTML = element.description;

        let blogPostButton = document.createElement("A");
        blogPostButton.classList.add("blog-post__cta");
        blogPostButton.setAttribute("href", element.url);
        blogPostButton.setAttribute("target", "_blank");
        blogPostButton.innerHTML = "Read More";

        blogPostDate.appendChild(blogPostDateSpan);
        blogPostInfo.appendChild(blogPostDate);
        blogPostInfo.appendChild(blogPostTitle);
        blogPostInfo.appendChild(blogPostDesc);
        blogPostInfo.appendChild(blogPostButton);

        imgcontainer.appendChild(singlepostimg);

        singlepost.appendChild(imgcontainer);
        singlepost.appendChild(blogPostInfo);

        recent.appendChild(singlepost);
    });
}

//the 2 functions below populate the 2 sections of the page (Trending Carousel and Recent posts)
function populateNews(news){
    if(news.length > 10){
        populateTrending(news.slice(0,10));
        populateRecent(news.slice(10));
    }else{
        let slider = document.getElementById("trending-slider");
        slider.innerHTML = '';
        populateRecent(news);
    }

    isLoading = false;
}



//get news from API with given categories(selected from the topics list or from preferences if onload)
function getNews(categories, keywords){
    const token = localStorage.getItem('x-auth-token');
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4) {   
           if (xmlhttp.status == 200) {
               const data = JSON.parse(xmlhttp.responseText);
               populateNews(data.news);
           }
           else {
               alert('Something bad happened while trying to receive your news');
           }
        }
    };

    if(categories.length > 0){
        
        let stringListOfCategories = "";
        categories.forEach(element => {
            stringListOfCategories = stringListOfCategories.concat(element);
            stringListOfCategories = stringListOfCategories.concat(",");
        });
        stringListOfCategories = stringListOfCategories.substr(0, stringListOfCategories.length - 1);
        if(keywords){
            xmlhttp.open('GET', '/api/news?categories='+stringListOfCategories+'&keywords='+keywords, true);
            lastRequest = '?categories='+stringListOfCategories+'&keywords='+keywords;
        }else{
            xmlhttp.open('GET', '/api/news?categories='+stringListOfCategories, true);
            lastRequest = '?categories='+stringListOfCategories
        }
    }else{
        if(keywords){
            xmlhttp.open('GET', '/api/news?keywords='+keywords, true);
            lastRequest = '?keywords='+keywords
        }else{
            xmlhttp.open('GET', '/api/news', true);
            lastRequest = '';
        }
        
    }//we save the lastRequest for the RSS
    
    if(token && !keywords){
        xmlhttp.setRequestHeader('x-auth-token', token) 
    }

    xmlhttp.send();

}


function ready(fn) {
    if (document.readyState != 'loading'){
      fn();
    } else {
      document.addEventListener('DOMContentLoaded', fn);
    }
  }

//When the page loads we load news with either stored preferences (if the user is logged) or with no preferences at all (if user is not logged or no preferences are set)
ready(function(){

    //token is needed only for stored RSS. It should not be used for the rest of the pages as it serves no other purposes
    const token = localStorage.getItem('x-auth-token');
    if(token){
        let navList = document.getElementById("profile_list");

        let settingsNode = document.createElement("LI");
        let settingsAnchor = document.createElement("A");
        settingsAnchor.setAttribute("href", "/profile");
        settingsAnchor.innerHTML = "Settings";
        settingsNode.appendChild(settingsAnchor);

        let logoutNode = document.createElement("LI");
        let logoutAnchor = document.createElement("A");
        logoutAnchor.setAttribute("href", "#");
        logoutAnchor.innerHTML = "Logout"
        logoutAnchor.id="logOutButton";
        logoutAnchor.classList.add("logout");
        logoutNode.addEventListener('click', function(){
            localStorage.removeItem('x-auth-token');
            location.reload();
        });
        logoutNode.appendChild(logoutAnchor);


        navList.appendChild(settingsNode);
        navList.appendChild(logoutNode);

        //look for preferences in local storage
        let preferences = JSON.parse(localStorage.getItem('preferences'));

        //if there are no preferences in the local storage we ask the private API for the user's preferences
        if(!preferences){
            var xmlhttp = new XMLHttpRequest();

            xmlhttp.onreadystatechange = function() {
                if (xmlhttp.readyState == 4) {   
                   if (xmlhttp.status == 200) {
                       const data = JSON.parse(xmlhttp.responseText);
                       localStorage.setItem('preferences', JSON.stringify(data.preferences));
                       preferences = data.preferences;
                       getNews(preferences.newsPref, null);
                   }
                   else {
                       alert('Something bad happened while trying to receive your preferences');
                   }
                }
            };
        
            xmlhttp.open('GET', '/user/preferences', true);
            xmlhttp.setRequestHeader('x-auth-token', token);
            xmlhttp.send();
        }else{
            listOfCategories = document.getElementsByClassName("category");

            for(let i = 0; i<listOfCategories.length; i++){
                if(preferences.newsPref.includes(listOfCategories[i].getAttribute("x-id"))){
                    listOfCategories[i].classList.add("selected");
                }
            }

            //with the preferences from API we ask for news from the public API
            getNews(preferences.newsPref, null);
        }


    }else{
        //if the user is not logged then on the load there will be no pre-selected categories(duh..)
        let navList = document.getElementById("profile_list");

        let loginNode = document.createElement("LI");
        let loginAnchor = document.createElement("A");
        loginAnchor.setAttribute("href", "/login");
        loginAnchor.innerHTML = "Login";
        loginNode.appendChild(loginAnchor);

        navList.appendChild(loginNode);

        getNews([], null);
    }
});




// add functionality to the categories
listOfCategories = document.getElementsByClassName("category");

for(var index = 0; index<listOfCategories.length; index++){
    listOfCategories[index].addEventListener('click', function(){

        if(!isLoading){
            isLoading = true;
            this.classList.toggle('selected');

            listOfSelectedCategories = document.getElementsByClassName('selected');
            let arrOfCategories = [];
            for(let j=0; j<listOfSelectedCategories.length; j++){
                arrOfCategories.push(listOfSelectedCategories[j].getAttribute("x-id"));
            }
            getNews(arrOfCategories, null);
        }
    })
}

//search submit by user
document.getElementById('search_news').onsubmit = function(e){
    e.preventDefault();

    if(!isLoading){
        let form = document.getElementById('search_news');
        let formData = new FormData(form);
    
        const searchTerms = formData.get('search_term');
        const searchInCategories = formData.get('select_prefference_search');
    
        if(searchTerms && searchTerms!=''){
            listOfSelectedCategories = document.getElementsByClassName('selected');
            let arrOfCategories = [];
            for(let j=0; j<listOfSelectedCategories.length; j++){
                arrOfCategories.push(listOfSelectedCategories[j].getAttribute("x-id"));
            }
            if(searchInCategories){
                getNews(arrOfCategories, searchTerms);
            }else{
                getNews([], searchTerms);
            }
            
        }
    }
}

//user ask for the rss of the current page
document.getElementById('downloadRss').addEventListener('click', function(){
    window.location.href = '/api/news/rss' + lastRequest;
});