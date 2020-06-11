var api_url= new URL('https://rer-umbrella.herokuapp.com/api');

function api_get(url,categories,keyword){
    var xmlhttp=new XMLHttpRequest();
    xmlhttp.onreadystatechange=function(){
        if(xmlhttp.readyState==4)
        {    
            if( xmlhttp.status==200){
                const data=JSON.parse(xmlhttp.responseText);
                fillPage(data);
            }
            else{
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
    let img_list=document.getElementById("images-container");
    img_list.innerHTML='';
    let small=0, medium=0;
    for(let i=0;i<data.images.length;i++){
        let fig=document.createElement('figure');
        if(medium<2){
            fig.className='figure-medium';
            medium++;
        }else{
            if(small<3){
                fig.className='figure-small';
                small++;
            }
            else{
                medium=0;
                small=0;
                fig.className='figure-medium';
                medium++;
            }
        }

        let img=document.createElement('img');
        img.src=data.images[i].largeImageURL;
        img.setAttribute("alt",data.images[i].tags);
        fig.appendChild(img);
        img_list.appendChild(fig);
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
    chrome.storage.sync.get('pref',function(obj){
        if(obj.pref!=undefined){
            let pref=JSON.parse(obj.pref);
            if(pref.imagesPref.length>0){
               var categories=pref.imagesPref[0];
                for(let i=1;i<pref.imagesPref.length;i++){
                    categories=categories+','+pref.imagesPref[i];
                }
                api_get(api_url+'/images',categories);
            }
            else{
                api_get(api_url+'/images',null);
            }
        }
        else{
            api_get(api_url+'/images',null);
        }
    });

    document.getElementById('search-images').onsubmit=function(e){
        e.preventDefault();

        let form=new FormData(this);

        let keyword=form.get('search-term');

        if (keyword!=''){
            console.log(keyword);
            chrome.storage.sync.get('pref',function(obj){
                if(obj.pref!=undefined){
                    let pref=JSON.parse(obj.pref);
                    if(pref.imagesPref.length>0){
                       var categories=pref.imagesPref[0];
                        for(let i=1;i<pref.imagesPref.length;i++){
                            categories=categories+','+pref.imagesPref[i];
                        }
                        api_get(api_url+'/images',categories,keyword);
                    }
                    else{
                        api_get(api_url+'/images',null,keyword);
                    }
                }
                else{
                    api_get(api_url+'/images',null,keyword);
                }
            });
           
        }else{
            chrome.storage.sync.get('pref',function(obj){
                if(obj.pref!=undefined){
                    let pref=JSON.parse(obj.pref);
                    if(pref.imagesPref.length>0){
                       var categories=pref.imagesPref[0];
                        for(let i=1;i<pref.imagesPref.length;i++){
                            categories=categories+','+pref.imagesPref[i];
                        }
                        api_get(api_url+'/images',categories,null);
                    }
                    else{
                        api_get(api_url+'/images',null,null);
                    }
                }
                else{
                    api_get(api_url+'/images',null,null);
                }
            });
            
        }        
    }
});