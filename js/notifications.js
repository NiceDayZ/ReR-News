
function checkIfShouldBeNotified(){
    const token = localStorage.getItem('x-auth-token');
    let preferences = JSON.parse(localStorage.getItem('preferences'));

    let categories = preferences.newsPref;

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4) {   
           if (xmlhttp.status == 200) {
               const data = JSON.parse(xmlhttp.responseText);
               if(data.news[0].url != document.getElementsByClassName('post-info')[0].firstChild.firstChild.getAttribute('href')){
                var img = data.news[0].urlToImage;
                var text = data.news[0].title;
                var notification = new Notification('There are new posts for you.', { body: text, icon: img });
               }else{
                   console.log("no new news");
               }
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
        xmlhttp.open('GET', '/api/news?categories='+stringListOfCategories, true);
    }else{
        xmlhttp.open('GET', '/api/news', true);
    }

    if(token){
        xmlhttp.setRequestHeader('x-auth-token', token) 
    }

    xmlhttp.send();

}

function notifyMe() {
    // Let's check if the browser supports notifications
    if (!("Notification" in window)) {
      alert("This browser does not support desktop notification");
    }
  
    // Let's check whether notification permissions have already been granted
    else if (Notification.permission === "granted") {
      // If it's okay let's create a notification
    //   var img = '../images/editabil-umbrela.png';
    //   var text = 'Welcome to UmbrElla';
    //   var notification = new Notification('UmbrElla', { body: text, icon: img });
        checkIfShouldBeNotified();
    }
  
    // Otherwise, we need to ask the user for permission
    else if (Notification.permission !== "denied") {
      Notification.requestPermission().then(function (permission) {
        // If the user accepts, let's create a notification
        if (permission === "granted") {
            // var img = '../images/editabil-umbrela.png';
            // var text = 'Welcome to UmbrElla';
            // var notification = new Notification('UmbrElla', { body: text, icon: img });
            checkIfShouldBeNotified();
        }
      });
    }

  };

  function callEvery15Mins() {
    if (Notification.permission != "denied") {
        Notification.requestPermission().then(function (permission) {
        });
      }

    setInterval(notifyMe, 1000 * 60 * 15);
}

