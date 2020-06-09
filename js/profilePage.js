function populateTicks(preferences){
    let newsTicks = document.getElementsByClassName("newsTick");
    let imagesTicks = document.getElementsByClassName("imagesTick");
    let videosTicks = document.getElementsByClassName("videoTick");
    let booksTicks = document.getElementsByClassName("booksTick");

    for(let i=0; i<newsTicks.length; i++){
        if(preferences.newsPref.includes(newsTicks[i].getAttribute("name"))){
            newsTicks[i].checked = true;
        }
    }

    for(let i=0; i<imagesTicks.length; i++){
        if(preferences.imagesPref.includes(imagesTicks[i].getAttribute("name"))){
            imagesTicks[i].checked = true;
        }
    }

    for(let i=0; i<videosTicks.length; i++){
        if(preferences.videosPref.includes(videosTicks[i].getAttribute("name"))){
            videosTicks[i].checked = true;
        }
    }

    for(let i=0; i<booksTicks.length; i++){
        if(preferences.booksPref.includes(booksTicks[i].getAttribute("name"))){
            booksTicks[i].checked = true;
        }
    }
}

function populateUserInfo(userInfo){
    document.getElementById("nameLabel").innerHTML = userInfo.name;
    document.getElementById("usernameText").innerHTML = userInfo.userName;
    document.getElementById("emailLabel").innerHTML = userInfo.email;

    if(userInfo.gender == 'male'){
        document.getElementById('male').checked = true;
        document.getElementById('user-info').style.backgroundImage = "url('../images/profile-man-avatar.jpg')";
    }else if(userInfo.gender == 'female'){
        document.getElementById('female').checked = true;
        document.getElementById('user-info').style.backgroundImage = "url('../images/profile-woman-avatar.jpg')";
    }
}

function populateCustom(customRSS){
    const token = localStorage.getItem('x-auth-token');
    let listOfRSS = document.getElementById("RSSlinks");
    listOfRSS.innerHTML = '';

    // li
    //  a(href='https://www.ziaruldeiasi.ro/') Ziarul de Iasi
    //  img(src='https://img.icons8.com/dusk/64/000000/delete-forever.png' alt='')
    //  label.switch
    //    input(type='checkbox' checked=false)
    //    span.slider.round
    //  br

    customRSS.forEach(rss => {
        let container = document.createElement('LI');
        
        let rssAnchor = document.createElement('A');
        rssAnchor.setAttribute('href', rss.link);
        rssAnchor.innerHTML = rss.link;

        let deleteImg = document.createElement("IMG");
        deleteImg.classList.add('deleteRSS');
        deleteImg.setAttribute('src', 'https://img.icons8.com/dusk/64/000000/delete-forever.png');
        deleteImg.setAttribute('alt', 'delete rss');

        deleteImg.addEventListener('click', function(){
            const deleteConfirm = confirm(`Are you sure you want to delete this feed (${rssAnchor.innerHTML})?`);

            if(deleteConfirm){
                var xmlhttp = new XMLHttpRequest();
                xmlhttp.onreadystatechange = function() {
                    if (xmlhttp.readyState == 4) {   
                        if (xmlhttp.status == 200) {
                            listOfRSS.removeChild(container);
                        }
                        else if (xmlhttp.status != 500) {
                            const data = JSON.parse(xmlhttp.responseText);
                            rssInput.setAttribute('checked', !rssInput.getAttribute('checked'));
                            alert(data.message);
                        }
                        else {
                            rssInput.setAttribute('checked', !rssInput.getAttribute('checked'));
                            alert('Something bad happened. Try again later');
                        }
                    }
                };
            
                xmlhttp.open('DELETE', '/user/rss', true);
                xmlhttp.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
                xmlhttp.setRequestHeader('x-auth-token', token);
                xmlhttp.send(JSON.stringify({
                    rss: rssAnchor.innerHTML
                }));
            }
        });

        let rssLabel = document.createElement("LABEL");
        rssLabel.classList.add('switch');
        
        let rssInput = document.createElement("INPUT");
        rssInput.setAttribute('type', 'checkbox');
        rssInput.checked = rss.enabled;

        let rssSpan = document.createElement("SPAN");
        rssSpan.classList.add('slider');
        rssSpan.classList.add('round');

        let breakLine = document.createElement("BR");

        rssLabel.appendChild(rssInput);
        rssLabel.appendChild(rssSpan);

        container.appendChild(rssAnchor);
        container.appendChild(deleteImg);
        container.appendChild(rssLabel);
        container.appendChild(breakLine);

        listOfRSS.appendChild(container);

        rssInput.addEventListener('click', function(){
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.onreadystatechange = function() {
                if (xmlhttp.readyState == 4) {   
                    if (xmlhttp.status == 200) {
                        //
                    }
                    else if (xmlhttp.status != 500) {
                        const data = JSON.parse(xmlhttp.responseText);
                        rssInput.setAttribute('checked', !rssInput.getAttribute('checked'));
                        alert(data.message);
                    }
                    else {
                        rssInput.setAttribute('checked', !rssInput.getAttribute('checked'));
                        alert('Something bad happened. Try again later');
                    }
                }
            };
        
            xmlhttp.open('PATCH', '/user/rss', true);
            xmlhttp.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
            xmlhttp.setRequestHeader('x-auth-token', token);
            xmlhttp.send(JSON.stringify({
                rss: rssAnchor.innerHTML
            }));
        });
    });
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
            localStorage.removeItem('preferences');
            location.reload();
        });
        logoutNode.appendChild(logoutAnchor);


        navList.appendChild(settingsNode);
        navList.appendChild(logoutNode);

        let profileInfo = document.getElementById("profileWrapper");
        let profileCustoms = document.getElementById("customPref");

        profileInfo.classList.remove("hide");
        profileCustoms.classList.remove("hide");
        
        //if there are no preferences in the local storage we ask the private API for the user's preferences
        var xmlhttp = new XMLHttpRequest();

        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == 4) {   
                if (xmlhttp.status == 200) {
                    const data = JSON.parse(xmlhttp.responseText);
                    localStorage.removeItem('preferences');
                    localStorage.setItem('preferences', JSON.stringify(data.user.preferences));

                    populateUserInfo(data.user);
                    populateTicks(data.user.preferences);
                    populateCustom(data.user.preferences.customRSS);
                }
                else {
                    alert('Something bad happened while trying to receive your userInfo');
                }
            }
        };
    
        xmlhttp.open('GET', '/user/profile', true);
        xmlhttp.setRequestHeader('x-auth-token', token);
        xmlhttp.send();
    
    }else{
        let preferences = JSON.parse(localStorage.getItem('preferences'));
        let navList = document.getElementById("profile_list");

        let loginNode = document.createElement("LI");
        let loginAnchor = document.createElement("A");
        loginAnchor.setAttribute("href", "/login");
        loginAnchor.innerHTML = "Login";
        loginNode.appendChild(loginAnchor);

        navList.appendChild(loginNode);

        if(preferences){
            populateTicks(preferences);
        }
    }
});

document.getElementById("updatePref").addEventListener('click', function(){
    let newsTicks = document.getElementsByClassName("newsTick");
    let imagesTicks = document.getElementsByClassName("imagesTick");
    let videosTicks = document.getElementsByClassName("videoTick");
    let booksTicks = document.getElementsByClassName("booksTick");

    let newsPref = [];
    let imagesPref = [];
    let videosPref = [];
    let booksPref = [];

    const token = localStorage.getItem('x-auth-token');

    for(let i=0; i<newsTicks.length; i++){
        if(newsTicks[i].checked){
            newsPref.push(newsTicks[i].getAttribute("name"));
        }
    }

    for(let i=0; i<imagesTicks.length; i++){
        if(imagesTicks[i].checked){
            imagesPref.push(imagesTicks[i].getAttribute("name"));
        }
    }

    for(let i=0; i<videosTicks.length; i++){
        if(videosTicks[i].checked){
            videosPref.push(videosTicks[i].getAttribute("name"));
        }
    }

    for(let i=0; i<booksTicks.length; i++){
        if(booksTicks[i].checked){
            booksPref.push(booksTicks[i].getAttribute("name"));
        }
    }
    if(videosPref.length <= 5){
        if(token){
            const objToBeSend = {
                news: newsPref,
                videos: videosPref,
                images: imagesPref,
                books: booksPref
            }
            const json = JSON.stringify(objToBeSend);
            var xmlhttp = new XMLHttpRequest();
        
            xmlhttp.onreadystatechange = function() {
                if (xmlhttp.readyState == 4) {   
                   if (xmlhttp.status == 200) {
                       const data = JSON.parse(xmlhttp.responseText);
                       localStorage.removeItem("preferences");
                       location.reload();
                   }
                   else if (xmlhttp.status != 500) {
                      const data = JSON.parse(xmlhttp.responseText);
                      alert(data.message);
                   }
                   else {
                       alert('Something bad happened. Try again later');
                   }
                }
            };
        
            xmlhttp.open('PUT', '/user/preferences', true);
            xmlhttp.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
            xmlhttp.setRequestHeader('x-auth-token', token);
            xmlhttp.send(json);
        }else{
            localStorage.removeItem("preferences");
            localStorage.setItem("preferences", JSON.stringify({
                newsPref: newsPref,
                videosPref: videosPref,
                imagesPref: imagesPref,
                booksPref: booksPref
            }));
        }
    }else{
        alert("A maximum of 5 categories are allowed for video resources due to the large ammound of time required to load this resource. Thank you.");
    }
    

});

document.getElementById("submit-name").addEventListener('click', function(){
    let firstName = document.getElementById('updated-name').value;
    let lastName = document.getElementById('updated-last-name').value;


    if(firstName != '' && lastName != ''){
        const json = JSON.stringify({
            name: firstName + ' ' + lastName
        });

        updateUserInfo(json);
    }else{
        alert("Please insert a valid name");
    }
});

document.getElementById("submit-username").addEventListener('click', function(){
    let userName = document.getElementById('new-username').value;


    if(userName != ''){
        const json = JSON.stringify({
            userName: userName
        });

        updateUserInfo(json);
    }else{
        alert("Please insert a valid Username");
    }
});

document.getElementById("submit-password").addEventListener('click', function(){
    let oldPassword = document.getElementById('old-password').value;
    let newPassword = document.getElementById('new-password').value;


    if(oldPassword != '' && oldPassword != ''){
        const json = JSON.stringify({
            oldPassword: oldPassword,
            newPassword: newPassword
        });

        const token = localStorage.getItem('x-auth-token');
        var xmlhttp = new XMLHttpRequest();

        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == 4) {   
               if (xmlhttp.status == 200) {
                   alert("You have succesfully changed your password. You will be redirected to the login page");
                   localStorage.removeItem("x-auth-token");
                   localStorage.removeItem("preferences");
                   window.location.href = '/login';
               }
               else if (xmlhttp.status != 500) {
                  const data = JSON.parse(xmlhttp.responseText);
                  alert(data.message);
               }
               else {
                   alert('Something bad happened. Try again later');
               }
            }
        };
    
        xmlhttp.open('POST', '/user/changePassword', true);
        xmlhttp.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
        xmlhttp.setRequestHeader('x-auth-token', token);
        xmlhttp.send(json);
    }else{
        alert("No empty password allowed");
    }
});

function updateUserInfo(json){
    const token = localStorage.getItem('x-auth-token');
    var xmlhttp = new XMLHttpRequest();

        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == 4) {   
               if (xmlhttp.status == 200) {
                   location.reload();
               }
               else if (xmlhttp.status != 500) {
                  const data = JSON.parse(xmlhttp.responseText);
                  alert(data.message);
               }
               else {
                   alert('Something bad happened. Try again later');
               }
            }
        };
    
        xmlhttp.open('PUT', '/user/profile', true);
        xmlhttp.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
        xmlhttp.setRequestHeader('x-auth-token', token);
        xmlhttp.send(json);
}

document.getElementById('websiteButton').addEventListener('click', function(){
    const token = localStorage.getItem('x-auth-token');
    const rss = document.getElementById('website').value;

    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4) {   
            if (xmlhttp.status == 200) {
                var xmlhttpAdd = new XMLHttpRequest();
                xmlhttpAdd.onreadystatechange = function() {
                    if (xmlhttpAdd.readyState == 4) {   
                       if (xmlhttp.status == 200) {
                           location.reload();
                       }
                       else if (xmlhttpAdd.status != 500) {
                          const data = JSON.parse(xmlhttpAdd.responseText);
                          alert(data.message);
                       }
                       else {
                           alert('Something bad happened. Try again later');
                       }
                    }
                };

                xmlhttpAdd.open('PUT', '/user/rss', true);
                xmlhttpAdd.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
                xmlhttpAdd.setRequestHeader('x-auth-token', token);
                xmlhttpAdd.send(JSON.stringify({
                    rss: rss
                }));
            }
            else if (xmlhttp.status != 500) {
                alert("The link you provided is not a valid feed. We need a valid RSS to subscribe it to our platform.")
            }
            else {
                alert('Something bad happened. Try again later');
            }
        }
    };

    xmlhttp.open('POST', '/api/validator/rss', true);
    xmlhttp.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
    xmlhttp.setRequestHeader('x-auth-token', token);
    xmlhttp.send(JSON.stringify({
        rssFeed: rss
    }));
    
});
