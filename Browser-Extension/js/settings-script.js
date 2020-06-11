var api_url="https://rer-umbrella.herokuapp.com/user";

function loggedIn(token){

    document.getElementsByClassName("login")[0].style.display="none";
    document.getElementsByClassName("logged-in")[0].style.display="block";
    
    let xmlhttp=new XMLHttpRequest();
    xmlhttp.onreadystatechange=function(){
        if(xmlhttp.readyState==4){
            if(xmlhttp.status==200){
                const data=JSON.parse(xmlhttp.responseText);
                document.getElementById('userName').innerHTML=data.user.userName;
                document.getElementById("login-form").reset();
            
                
                setPreferences(data.user.preferences);
            }
            else{
                alert("Something bad happened while trying to receive your preferences. Please logout and login again.")
            }
        }
    };
    xmlhttp.open('GET',api_url+'/profile',true);
    xmlhttp.setRequestHeader('x-auth-token',token);
    xmlhttp.send();

}

function setPreferences(preferences){

    chrome.storage.sync.get(['token','pref'],function(obj){

        if(obj.token!=undefined){
             //dupa ce s-a logat un user, trebuie sa ii afisez preferintele deja salvate in contul lui, si sa le salvez si in storage
            if(obj.pref!=undefined){
                //cand fac login dupa ce unele preferinte au fost alese inainte de login, trebuie sa le elimin intai, pt ca sa le afisez doar pe cele ale utilizatorului logat..
                let checks=document.querySelectorAll(".choices input[type='checkbox']");
                for(let i=0;i<checks.length;i++){
                    checks[i].checked=false;
                }
                
            }
            var prefer=JSON.stringify({
                newsPref: preferences.newsPref,
                imagesPref: preferences.imagesPref,
                videosPref: preferences.videosPref,
                booksPref: preferences.booksPref
            });
            chrome.storage.sync.set({'pref':prefer});

            pref=JSON.parse(prefer);
        }
        else{
            pref=JSON.parse(preferences);
        }

        for(let i=0;i<pref.newsPref.length;i++){
            document.querySelector(".news-choices input[name="+pref.newsPref[i]+"]").checked='true';
        }
    
        for(let i=0;i<pref.imagesPref.length;i++){
            document.querySelector(".image-choices input[name="+pref.imagesPref[i]+"]").checked='true';
        }
    
        for(let i=0;i<pref.videosPref.length;i++){
            document.querySelector(".video-choices input[name="+pref.videosPref[i]+"]").checked='true';
        }
    
        for(let i=0;i<pref.booksPref.length;i++){
            document.querySelector(".docs-choices input[name="+pref.booksPref[i]+"]").checked='true';
        }
    

    });

}

function ready(fn) {
    if (document.readyState != 'loading'){
      fn();
    } else {
      document.addEventListener('DOMContentLoaded', fn);
    }
}

ready(function(){
  
    chrome.storage.sync.get(['token','pref'],function(storageObj){
        if(storageObj.token!=undefined){
            loggedIn(storageObj.token);
        }else
        {
            if(storageObj.pref!=undefined){
                setPreferences(storageObj.pref);
            }
        }
    });

    document.getElementById('login-form').onsubmit=function(e){
        e.preventDefault();

        const email=document.getElementById('email').value;
        const pswd=document.getElementById('password').value;

        const json= JSON.stringify({
            email: email,
            password: pswd
        });

        let xmlhttp=new XMLHttpRequest();

        xmlhttp.onreadystatechange=function(){
            if(xmlhttp.readyState==4 ){
                if(xmlhttp.status==200){
                    const data=JSON.parse(xmlhttp.responseText);
        
                    chrome.storage.sync.set({'token': data.token},function(){
                        loggedIn(data.token);
                    });
                }
                else{
                    if(xmlhttp.status!=500){
                        const data=JSON.parse(xmlhttp.responseText);
                        document.getElementById("error").innerHTML=data.message;
                    }
                    else{
                        document.getElementById("error").innerHTML="Something bad happened. Try again later";
                    }
                }
            }
        };
    
        xmlhttp.open("POST",api_url+'/login',true);
        xmlhttp.setRequestHeader('Content-type', 'application/json; charset=utf-8');
        xmlhttp.send(json);
    };

    document.getElementById("logout").addEventListener('click',function (){
     
        chrome.storage.sync.remove('token');
        chrome.storage.sync.remove('pref');
        let checks=document.querySelectorAll(".choices input[type='checkbox']");
        for(let i=0;i<checks.length;i++){
            checks[i].checked=false;
        }

        document.getElementsByClassName("login")[0].style.display="block";
        document.getElementsByClassName("logged-in")[0].style.display="none";
    });

    document.getElementById('save-pref').addEventListener('click',function(){
      

        let newsChecked=document.querySelectorAll(".news-choices input:checked");
        let imagesChecked=document.querySelectorAll(".image-choices input:checked");
        let videosChecked=document.querySelectorAll(".video-choices input:checked");
        let booksChecked=document.querySelectorAll(".docs-choices input:checked");

        let prefNews=[];
        let prefImg=[];
        let prefVideo=[];
        let prefBooks=[];

        for(let i=0;i<newsChecked.length;i++){
            prefNews.push(newsChecked[i].getAttribute('name'));
        }

        for(let i=0;i<imagesChecked.length;i++){
            prefImg.push(imagesChecked[i].getAttribute('name'));
        }

        for(let i=0;i<videosChecked.length;i++){
            prefVideo.push(videosChecked[i].getAttribute('name'));
        }

        for(let i=0;i<booksChecked.length;i++){
            prefBooks.push(booksChecked[i].getAttribute('name'));
        }

        let pref=JSON.stringify({
            newsPref: prefNews,
            imagesPref: prefImg,
            videosPref: prefVideo,
            booksPref: prefBooks
        });

        chrome.storage.sync.set({'pref': pref});

        //daca userul este autentificat, salvez modificarile si in bd
       
        chrome.storage.sync.get('token',function(obj){
            if(obj.token!=undefined){
                let json=JSON.stringify({
                    news:prefNews,
                    images:prefImg,
                    videos: prefVideo,
                    books:prefBooks
                });
                let xmlhttp=new XMLHttpRequest();
    
                xmlhttp.onreadystatechange=function(){
                    if(xmlhttp.readyState==4 ){
                        if(xmlhttp.status==200){
                            const data=JSON.parse(xmlhttp.responseText);
                            console.log("Preferences added!");
                        }
                        else{
                            if(xmlhttp.status!=500){
                                const data=JSON.parse(xmlhttp.responseText);
                            console.log(data.message);
                            }
                            else{
                                alert("Something bad happened. Try again later");
                            }
                        }
                    }
                };
            
                xmlhttp.open("PUT",api_url+'/preferences',true);
                xmlhttp.setRequestHeader('Content-type', 'application/json; charset=utf-8');
                xmlhttp.setRequestHeader('x-auth-token', obj.token);
                xmlhttp.send(json);
    
            }
        });
        
    });
});


