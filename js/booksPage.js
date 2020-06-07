var isLoading = true;
var lastRequest = '';

function populateBooks(books){
    //loading the books in page


    let bookWrapper = document.getElementById("books_wrapper");
    bookWrapper.innerHTML = '';

    books.forEach(element => {
        let bookElement = document.createElement("LI");
        bookElement.classList.add("book-container");

        let bookImageDiv = document.createElement("DIV");
        bookImageDiv.classList.add("book-image");

        let bookImage = document.createElement("IMG");
        bookImage.setAttribute('src', element.image);
        bookImage.setAttribute('alt', 'cover image of ' + element.title);

        let bookTitleDiv = document.createElement("DIV");
        bookImageDiv.classList.add("book-title");

        let bookTitle = document.createElement("H2");

        let bookTitleAnchor = document.createElement("A");
        bookTitleAnchor.setAttribute('href', element.link || element.preview);
        bookTitleAnchor.setAttribute('target', '_blank');
        bookTitleAnchor.innerHTML = element.title;

        let bookAuthorDiv = document.createElement("DIV");
        bookAuthorDiv.classList.add("autor") ;

        let bookAuthor = document.createElement("I");
        bookAuthor.innerHTML = element.author;

        let bookDate = document.createElement("DIV");
        bookDate.classList.add("book-date");
        bookDate.innerHTML = element.publishedDate;

        let bookInfo = document.createElement("DIV");
        bookInfo.classList.add("book-info");
        bookInfo.innerHTML = element.description;

        bookImageDiv.appendChild(bookImage);
        bookTitle.appendChild(bookTitleAnchor);
        bookTitleDiv.appendChild(bookTitle);
        bookAuthorDiv.appendChild(bookAuthor);

        bookElement.appendChild(bookImageDiv);
        bookElement.appendChild(bookTitleDiv);
        bookElement.appendChild(bookAuthorDiv);
        bookElement.appendChild(bookDate);
        bookElement.appendChild(bookInfo);

        bookWrapper.appendChild(bookElement);
    });
    
    isLoading = false;
}

function getBooks(categories, keywords){
    isLoading=true;

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4) {   
           if (xmlhttp.status == 200) {
               const data = JSON.parse(xmlhttp.responseText);
               populateBooks(data.books);
           }
           else {
               alert('Something bad happened while trying to receive your books');
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
            xmlhttp.open('GET', '/api/books?categories='+stringListOfCategories+'&keywords='+keywords, true);
            lastRequest = '?categories='+stringListOfCategories+'&keywords='+keywords;
        }else{
            xmlhttp.open('GET', '/api/books?categories='+stringListOfCategories, true);
            lastRequest = '?categories='+stringListOfCategories
        }
    }else{
        if(keywords){
            xmlhttp.open('GET', '/api/books?keywords='+keywords, true);
            lastRequest = '?keywords='+keywords
        }else{
            xmlhttp.open('GET', '/api/books', true);
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
            localStorage.removeItem('preferences');
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
                       getBooks(preferences.booksPref, null);
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
                if(preferences.booksPref.includes(listOfCategories[i].getAttribute("x-id"))){
                    listOfCategories[i].classList.add("selected");
                }
            }

            //with the preferences from API we ask for news from the public API
            getBooks(preferences.booksPref, null);
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

        getBooks([], null);
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
            getBooks(arrOfCategories, null);
        }

        
    })
}

//search submit by user
document.getElementById('search_books').onsubmit = function(e){
    e.preventDefault();

    if(!isLoading){
        let form = document.getElementById('search_books');
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
                getBooks(arrOfCategories, searchTerms);
            }else{
                getBooks([], searchTerms);
            }
            
        }
    }
}

//user ask for the rss of the current page
document.getElementById('downloadRss').addEventListener('click', function(){
    window.location.href = '/api/books/rss' + lastRequest;
});