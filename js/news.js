

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
        author.innerHTML = element.author;

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
}

function populateNews(news){
    if(news.length > 10){
        populateTrending(news.slice(0,10));
        populateRecent(news.slice(10));
    }else{
        populateRecent(news);
    }
}



//get news from API
function getNews(categories){
    const token = localStorage.getItem('x-auth-token');
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4) {   
           if (xmlhttp.status == 200) {
               const data = JSON.parse(xmlhttp.responseText);
               populateNews(data.news);
           }
           else {
               alert('Something bad happened while trying to receive your preferences');
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
        xmlhttp.open('GET', '/api/news?categories='+stringListOfCategories, true);
    }else{
        xmlhttp.open('GET', '/api/news', true);
    }
    
    console.log(token);
    if(token){
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

ready(function(){
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
        logoutNode.appendChild(logoutAnchor);


        navList.appendChild(settingsNode);
        navList.appendChild(logoutNode);

        let preferences = JSON.parse(localStorage.getItem('preferences'));

        if(!preferences){
            var xmlhttp = new XMLHttpRequest();

            xmlhttp.onreadystatechange = function() {
                if (xmlhttp.readyState == 4) {   
                   if (xmlhttp.status == 200) {
                       const data = JSON.parse(xmlhttp.responseText);
                       localStorage.setItem('preferences', JSON.stringify(data.preferences));
                       preferences = data.preferences;
                       getNews(preferences.newsPref);
                   }
                   else {
                       alert('Something bad happened while trying to receive your preferences');
                   }
                }
            };
        
            xmlhttp.open('GET', '/user/preferences', true);
            xmlhttp.setRequestHeader('x-auth-token', token) 
            xmlhttp.send();
        }else{
            getNews(preferences.newsPref);
        }


    }else{
        let navList = document.getElementById("profile_list");

        let loginNode = document.createElement("LI");
        let loginAnchor = document.createElement("A");
        loginAnchor.setAttribute("href", "/login");
        loginAnchor.innerHTML = "Login";
        loginNode.appendChild(loginAnchor);

        navList.appendChild(loginNode);

        getNews([]);
    }
});