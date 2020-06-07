var isLoading = true;
var lastRequest = '';

function populateImages(images){
    //loading the images in page

    let container = document.getElementById('imgContainer');
    container.innerHTML = '';

    images.forEach(element => {
        // article#imgContainer
        // a(href='../images/1.jpg' target='_blank')
        //   section
        //     .images
        //       img(src='../images/1.jpg')
        //     .overlay-effect
        //       .overlay-text Limbo

        let imageAnchor = document.createElement("A");
        imageAnchor.setAttribute("href", element.pageURL);
        imageAnchor.setAttribute("target", "_blank");

        let section = document.createElement("SECTION");
        
        let imageDiv = document.createElement("DIV");
        imageDiv.classList.add("images");

        let image = document.createElement("IMG");
        image.setAttribute('src', element.largeImageURL);
        image.setAttribute('alt', element.tags);

        let overlayEffect = document.createElement("DIV");
        overlayEffect.classList.add("overlay-effect");

        let overlayText = document.createElement("DIV");
        overlayText.classList.add("overlay-text");
        overlayText.innerHTML = element.tags;

        imageDiv.appendChild(image);
        overlayEffect.appendChild(overlayText);
        section.appendChild(imageDiv);
        section.appendChild(overlayEffect);
        imageAnchor.appendChild(section);

        container.appendChild(imageAnchor);
    });

    isLoading = false;
}

function getImages(categories, keywords){
    isLoading=true;

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4) {   
           if (xmlhttp.status == 200) {
               const data = JSON.parse(xmlhttp.responseText);
               populateImages(data.images);
           }
           else {
               alert('Something bad happened while trying to receive your images');
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
            xmlhttp.open('GET', '/api/images?categories='+stringListOfCategories+'&keywords='+keywords, true);
            lastRequest = '?categories='+stringListOfCategories+'&keywords='+keywords;
        }else{
            xmlhttp.open('GET', '/api/images?categories='+stringListOfCategories, true);
            lastRequest = '?categories='+stringListOfCategories
        }
    }else{
        if(keywords){
            xmlhttp.open('GET', '/api/images?keywords='+keywords, true);
            lastRequest = '?keywords='+keywords
        }else{
            xmlhttp.open('GET', '/api/images', true);
            lastRequest = '';
        }
        
    }//we save the lastRequest for the RSS

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
                       getImages(preferences.imagesPref, null);
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
                if(preferences.imagesPref.includes(listOfCategories[i].getAttribute("x-id"))){
                    listOfCategories[i].classList.add("selected");
                }
            }

            //with the preferences from API we ask for news from the public API
            getImages(preferences.imagesPref, null);
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

        getImages([], null);
    }

});

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
            getImages(arrOfCategories, null);
        }

        
    })
}

//search submit by user
document.getElementById('search_images').onsubmit = function(e){
    e.preventDefault();

    if(!isLoading){
        let form = document.getElementById('search_images');
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
                getImages(arrOfCategories, searchTerms);
            }else{
                getImages([], searchTerms);
            }
            
        }
    }
}

//user ask for the rss of the current page
document.getElementById('downloadRss').addEventListener('click', function(){
    window.location.href = '/api/images/rss' + lastRequest;
});