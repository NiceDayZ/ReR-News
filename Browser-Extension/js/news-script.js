var api_url= new URL('https://rer-umbrella.herokuapp.com/api');
var url_tab;
var json;

function api_validator(url,callback){
    var xmlhttp=new XMLHttpRequest();
    xmlhttp.onreadystatechange=function(){
        if(xmlhttp.readyState==4 && (xmlhttp.status==200 || xmlhttp.status==406)){
            var data=JSON.parse(xmlhttp.responseText);
            callback(data);
        }
    };
    xmlhttp.open("POST",url,true);
    xmlhttp.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    xmlhttp.send(json);
}


chrome.tabs.query({currentWindow:true, active:true}, function(tabs){
     url_tab=tabs[0].url;
     document.getElementById('tab-hostname').innerHTML=new URL(url_tab).hostname;
     let url_origin=new URL(url_tab).origin;

     document.getElementById('check-rss').addEventListener('change',function(){
        if(this.checked){
            autoRSSValidator(url_origin);          
        }
     });
});


function autoRSSValidator(url_origin){
    json=JSON.stringify({
        rssFeed: url_origin+'/rss'
    });
    api_validator(api_url+'/validator/rss', function(data){
        if(data.success==true){
            console.log('success');
            document.getElementById("response").innerHTML='Success';
            document.getElementById("response").style.color="green";
            addRSS(url_origin+'/rss');
        }else{
            json=JSON.stringify({
                rssFeed: url_origin+'/feed'
            });
            api_validator(api_url+'/validator/rss', function(data){
                if(data.success==true){
                    console.log('success');
                    document.getElementById("response").innerHTML='Success';
                    document.getElementById("response").style.color="green";        
                    addRSS(url_origin+'/feed');
                }else{
                    json=JSON.stringify({
                        rssFeed: url_origin+'/feeds/posts/default'
                    });
                    api_validator(api_url+'/validator/rss', function(data){
                        if(data.success==true){
                            console.log('success');
                            document.getElementById("response").innerHTML='Success';
                            document.getElementById("response").style.color="green";
                            addRSS(url_origin+'/feeds/posts/default');
                   
                        }else{
                            console.log("no rss!!!");
                            document.getElementById("response").innerHTML='Fail';
                            document.getElementById("response").style.color="red";
                            /*aici trebuie sa afisez casuta de dialog pt ca userul sa poata adauga el linkul rss-ului */
                            document.getElementById("auto-rss").style.display="none";
                            document.getElementById("no-rss").style.display="inline-block";
                        }
                    });
                }
            });
        }
    });

}

function userRSSValidator(url_rss){

    json=JSON.stringify({
        rssFeed: url_rss
    });
    api_validator(api_url+'/validator/rss', function(data){
        if(data.success==true){
            console.log('success');
            document.getElementById("response").innerHTML='Success';
            document.getElementById("response").style.color="green";        
            document.getElementById("auto-rss").style.display="inline-block";
            document.getElementById("no-rss").style.display="none";
      
            addRSS(url_rss);
        }else{
            
            console.log("no rss!!!");
            document.getElementById("invalid-rss").innerHTML='Invalid rss. Paste a valid rss link!';
            document.getElementById("invalid-rss").style.color="red";
         }
    
    
    });
}

function addRSS(url_rss){
    var xmlhttp=new XMLHttpRequest();
    xmlhttp.onreadystatechange=function(){
        if(xmlhttp.readyState==4){
            if (xmlhttp.status==200){
                const data=JSON.parse(xmlhttp.responseText);
                console.log("rss added (in bd) with success!");
            }else{
                const data=JSON.parse(xmlhttp.responseText);
                console.log(data.message);
            }
        }
    };
    let body=JSON.stringify({
        rss : url_rss
    });

    xmlhttp.open("PUT","https://rer-umbrella.herokuapp.com/user/rss",true);
    xmlhttp.setRequestHeader('Content-type', 'application/json; charset=utf-8');

    chrome.storage.sync.get('token',function(obj){
        if(obj.token!=undefined)
        {            
            xmlhttp.setRequestHeader('x-auth-token',obj.token);
        }

        xmlhttp.send(body);
    });    
}

function api_get(url,categories,keyword){
    var xmlhttp=new XMLHttpRequest();
    xmlhttp.onreadystatechange=function(){
        if(xmlhttp.readyState==4){
            if (xmlhttp.status==200){
                const data=JSON.parse(xmlhttp.responseText);
                fillPage(data);
            }else{
                const data=JSON.parse(xmlhttp.responseText);
                console.log(data.message);
            }
        }
    };
    if(categories!=null){
        let new_url=new URL(url);
        new_url.searchParams.set('categories',categories);  
        url=new_url;   
    }
    if(keyword!=null){
        let new_url=new URL(url);
        new_url.searchParams.set('keywords',keyword);  
        url=new_url; 
    }

    xmlhttp.open("GET",url,true);
    xmlhttp.send();
}

function fillPage(data){
    let ul=document.getElementById("news-news");
    ul.innerHTML='';
    for( var i=0;i<data.news.length;i++){
        let li=document.createElement('li');
        li.className='news-block';
        let div=document.createElement('div');
        div.className='news-image';
        let img= document.createElement('img');
        img.src=data.news[i].urlToImage;
        img.setAttribute("alt","news image");
        div.appendChild(img);
        li.appendChild(div);
        
        div=document.createElement('div');
        div.className='x-exit';
        let i_elem=document.createElement('i');
        i_elem.className='fas fa-times';
        i_elem.addEventListener("click",function(){
            li.style.display="none";
        });
        div.appendChild(i_elem);
        li.appendChild(div);

        div=document.createElement('div');
        div.className='news-time';
        div.innerHTML=data.news[i].publishedAt;
        li.appendChild(div);

        div=document.createElement('div');
        div.className='news-title';
        let h2=document.createElement('h2');
        let a=document.createElement('a');
        a.href=data.news[i].url;
        if(data.news[i].title.length>120){
            a.innerHTML=data.news[i].title.substr(0,117)+'...';
        }else{
            a.innerHTML=data.news[i].title;
        }
        a.target="_blank";
        h2.appendChild(a);
        div.appendChild(h2);
        li.appendChild(div);

        div=document.createElement('div');
        div.className='news-info';
        
        if(data.news[i].description!=null){
            if(data.news[i].description.length>350){
                div.innerHTML=data.news[i].description.substr(0,350)+'...';
            }else{
                div.innerHTML=data.news[i].description;
            }
        }
        li.appendChild(div);

        ul.appendChild(li);
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

    chrome.storage.sync.get(['token','pref'],function(obj){
        if (obj.token!=undefined){
            document.getElementById("add-rss").style.display="inline-block";
        }else{
            document.getElementById("add-rss").style.display="none";
        }
        
        if(obj.pref!=undefined){
            let pref=JSON.parse(obj.pref);
            if(pref.newsPref.length>0){
               var categories=pref.newsPref[0];
                for(let i=1;i<pref.newsPref.length;i++){
                    categories=categories+','+pref.newsPref[i];
                }
                api_get(api_url+'/news',categories);
            }
            else{
                api_get(api_url+'/news',null);
            }
        }
        else{
            api_get(api_url+'/news',null);
        }
    });
    

    document.getElementById('add-user-rss').addEventListener('click',function(){
        let val=document.getElementById("user-input").value;
        if(val==''){
            alert('Please add a link in the text box!');
        }else{
            userRSSValidator(val); //trebuie validat intai linkul!
            document.getElementById("user-input").value='';
        }

    });

    document.getElementById('search-news').onsubmit=function(e){
        e.preventDefault();

        let form=new FormData(this);

        let keyword=form.get('search-term');

        if (keyword!=''){
            chrome.storage.sync.get('pref',function(obj){
                if(obj.pref!=undefined){
                    let pref=JSON.parse(obj.pref);
                    if(pref.newsPref.length>0){
                       var categories=pref.newsPref[0];
                        for(let i=1;i<pref.newsPref.length;i++){
                            categories=categories+','+pref.newsPref[i];
                        }
                        api_get(api_url+'/news',categories,keyword);
                    }
                    else{
                        api_get(api_url+'/news',null,keyword);
                    }
                }
                else{
                    api_get(api_url+'/news',null,keyword);
                }
            });
           
        }else{
            chrome.storage.sync.get('pref',function(obj){
                if(obj.pref!=undefined){
                    let pref=JSON.parse(obj.pref);
                    if(pref.newsPref.length>0){
                    var categories=pref.newsPref[0];
                        for(let i=1;i<pref.newsPref.length;i++){
                            categories=categories+','+pref.newsPref[i];
                        }
                        api_get(api_url+'/news',categories,null);
                    }
                    else{
                        api_get(api_url+'/news',null,null);
                    }
                }
                else{
                    api_get(api_url+'/news',null,null);
                }
            });
        }


        
    }

});

