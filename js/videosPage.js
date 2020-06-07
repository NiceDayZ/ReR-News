var isLoading = true;
var lastRequest = '';

function populateVideos(videos){
    let videoContainer = document.getElementById("videos");
    videoContainer.innerHTML = '';

    videos.forEach(element => {
        let gridItem = document.createElement("DIV");
        gridItem.classList.add("grid-item");
        gridItem.innerHTML = element.html;

        videoContainer.appendChild(gridItem);
    });

    isLoading = false;
}

function getVideos(categories, keywords){
    isLoading=true;
    let problems = false;
    const token = localStorage.getItem('x-auth-token');
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4) {   
           if (xmlhttp.status == 200) {
               const data = JSON.parse(xmlhttp.responseText);
               populateVideos(data.videos);
           }
           else {
               alert('Something bad happened while trying to receive your videos');
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
            xmlhttp.open('GET', '/api/videos?categories='+stringListOfCategories+'&keywords='+keywords, true);
            lastRequest = '?categories='+stringListOfCategories+'&keywords='+keywords;
        }else{
            xmlhttp.open('GET', '/api/videos?categories='+stringListOfCategories, true);
            lastRequest = '?categories='+stringListOfCategories
        }
    }else{
        if(keywords){
            alert("At least 1 category should be selected before searching after keywords");
            problems = true;

        }else{
            xmlhttp.open('GET', '/api/videos', true);
            lastRequest = '';
        }
        
    }//we save the lastRequest for the RSS

    if(!problems){
        xmlhttp.send();
    }
}

function ready(fn) {
    if (document.readyState != 'loading'){
      fn();
    } else {
      document.addEventListener('DOMContentLoaded', fn);
    }
}

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
                       getVideos(preferences.videosPref, null);
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
                if(preferences.videosPref.includes(listOfCategories[i].getAttribute("x-id"))){
                    listOfCategories[i].classList.add("selected");
                }
            }

            //with the preferences from API we ask for news from the public API
            getVideos(preferences.videosPref, null);
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

        getVideos([], null);
    }

    let videoContainer = document.getElementById("videos");
    videoContainer.innerHTML = '';
});

listOfCategories = document.getElementsByClassName("category");

for(var index = 0; index<listOfCategories.length; index++){
    listOfCategories[index].addEventListener('click', function(){

        console.log()

        if(document.getElementsByClassName("selected").length < 5){
            if(!isLoading){
                isLoading = true;
                this.classList.toggle('selected');
    
                listOfSelectedCategories = document.getElementsByClassName('selected');
                let arrOfCategories = [];
                for(let j=0; j<listOfSelectedCategories.length; j++){
                    arrOfCategories.push(listOfSelectedCategories[j].getAttribute("x-id"));
                }
                getVideos(arrOfCategories, null);
            }
        }else{
            alert("Because of the time required to load these videos a maximum of 5 categories is allowed in this section. Thank you");
        }
        
    })
}

//search submit by user
document.getElementById('search_videos').onsubmit = function(e){
    e.preventDefault();
    if(!isLoading){
        let form = document.getElementById('search_videos');
        let formData = new FormData(form);
    
        const searchTerms = formData.get('search_term');
    
        if(searchTerms && searchTerms!=''){
            listOfSelectedCategories = document.getElementsByClassName('selected');
            let arrOfCategories = [];
            for(let j=0; j<listOfSelectedCategories.length; j++){
                arrOfCategories.push(listOfSelectedCategories[j].getAttribute("x-id"));
            }
            getVideos(arrOfCategories, searchTerms);
            
        }
    }
}

//user ask for the rss of the current page
document.getElementById('downloadRss').addEventListener('click', function(){
    window.location.href = '/api/videos/rss' + lastRequest;
});