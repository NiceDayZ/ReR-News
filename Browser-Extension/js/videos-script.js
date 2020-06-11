var api_url= new URL('https://rer-umbrella.herokuapp.com/api');

function api_get(url,categories,keyword){
    var xmlhttp=new XMLHttpRequest();
    xmlhttp.onreadystatechange=function(){
        if(xmlhttp.readyState==4){
            if( xmlhttp.status==200){
                const data=JSON.parse(xmlhttp.responseText);
               fillPage(data);
            }else{
                const data=JSON.parse(xmlhttp.responseText);
                console.log(data.message)
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
    let video_list=document.getElementById("videos-list");
    video_list.innerHTML='';
    for(let i=0;i<data.videos.length;i++){
        let li=document.createElement('li');
        li.className='video-wrapper';
        li.innerHTML=data.videos[i].html;
        video_list.appendChild(li);
    }
};

function ready(fn) {
    if (document.readyState != 'loading'){
      fn();
    } else {
      document.addEventListener('DOMContentLoaded', fn);
    }
}

ready(function(){
    chrome.storage.sync.get('pref',function(obj){
        if(obj.pref!=undefined){
            let pref=JSON.parse(obj.pref);
            if(pref.videosPref.length>0){
               var categories=pref.videosPref[0];
                for(let i=1;i<pref.videosPref.length;i++){
                    categories=categories+','+pref.videosPref[i];
                }
                api_get(api_url+'/videos',categories);
            }
            else{
                api_get(api_url+'/videos',null);
            }
        }
        else{
            api_get(api_url+'/videos',null);
        }

    });
    

    document.getElementById('search-videos').onsubmit=function(e){
        e.preventDefault();

        let form=new FormData(this);

        let keyword=form.get('search-term');

        if (keyword!=''){
            chrome.storage.sync.get('pref',function(obj){
                if(obj.pref!=undefined){
                    let pref=JSON.parse(obj.pref);
                    if(pref.videosPref.length>0){
                       var categories=pref.videosPref[0];
                        for(let i=1;i<pref.videosPref.length;i++){
                            categories=categories+','+pref.videosPref[i];
                        }
                        api_get(api_url+'/videos',categories,keyword);
                    }
           //nu se poate cauta dupa keyword, daca nu sunt preferinte selectate
                   
                }
            });
        }else{
            chrome.storage.sync.get('pref',function(obj){
                if(obj.pref!=undefined){
                    let pref=JSON.parse(obj.pref);
                    if(pref.videosPref.length>0){
                       var categories=pref.videosPref[0];
                        for(let i=1;i<pref.videosPref.length;i++){
                            categories=categories+','+pref.videosPref[i];
                        }
                        api_get(api_url+'/videos',categories,null);
                    }
                    else{
                        api_get(api_url+'/videos',null,null);
                    }
                }
                else{
                    api_get(api_url+'/videos',null,null);
                }
            });
            
        }
    }

});