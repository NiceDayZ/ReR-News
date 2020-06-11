var api_url= new URL('https://rer-umbrella.herokuapp.com/api');
var lengthShowLess=300;

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
    let ul=document.getElementById("docs-list");
    ul.innerHTML='';
    for(let i=0;i<data.books.length;i++){
        let li=document.createElement('li');
        li.className='news-block';
        let div=document.createElement('div');
        div.className='news-image';
        let img= document.createElement('img');
        img.src=data.books[i].image;
        img.setAttribute("alt","cover of book "+data.books[i].title.substr(0,80));
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
        div.className='news-title';
        let h2=document.createElement('h2');
        let a=document.createElement('a');
        if (data.books[i].link==null){
            a.href=data.books[i].preview;
        }else{
            a.href=data.books[i].link;
        }

        if(data.books[i].title.length<150)
            a.innerHTML=data.books[i].title;
        else
            a.innerHTML=data.books[i].title.substr(0,150)+'...';
        a.target="_blank";
        h2.appendChild(a);
        div.appendChild(h2);
        li.appendChild(div);

        div=document.createElement('div');
        div.className='autor';
        div.innerHTML='by '+data.books[i].author;
        div.style.display='inline-block';
        li.appendChild(div);

        div=document.createElement('div');
        div.className='news-time';
        div.innerHTML=data.books[i].publishedDate;
        div.style.display='inline-block';  
        li.appendChild(div);

        div=document.createElement('div');
        div.className='news-info';

        if(data.books[i].description!=undefined){
            if(data.books[i].description.length>lengthShowLess+20){
                let text=data.books[i].description;
                div.innerHTML=data.books[i].description.substr(0,lengthShowLess)+'...';
                let readMore=document.createElement('span');
                readMore.style.display="inline-block";
                readMore.innerHTML="Read more";
                readMore.style.color="blue";
                readMore.style.cursor="pointer";
                
                div.appendChild(readMore);
                li.appendChild(div);

                readMore.addEventListener("click",function(){
                    div.innerHTML=text;
                    let readLess=document.createElement('span');
                    readLess.style.display="inline-block";
                    readLess.innerHTML="Read less";
                    readLess.style.color="blue";
                    readLess.style.cursor="pointer";
                    div.appendChild(readLess);
                    readLess.addEventListener("click",function(){
                        div.innerHTML=text.substr(0,lengthShowLess)+'...';
                        div.appendChild(readMore);
                    });
                });
            }else{
                div.innerHTML=data.books[i].description;
                li.appendChild(div);
            }
        }
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
    chrome.storage.sync.get('pref',function(obj){
        if(obj.pref!=undefined){
            let pref=JSON.parse(obj.pref);
            if(pref.booksPref.length>0){
               var categories=pref.booksPref[0];
                for(let i=1;i<pref.booksPref.length;i++){
                    categories=categories+','+pref.booksPref[i];
                }
                api_get(api_url+'/books',categories);
            }
            else{
                api_get(api_url+'/books',null);
            }
        }
        else{
            api_get(api_url+'/books',null);
        }
    });
    

    document.getElementById('search-books').onsubmit=function(e){
        e.preventDefault();

        let form=new FormData(this);

        let keyword=form.get('search-term');

        if (keyword!=''){
           chrome.storage.sync.get('pref',function(obj){
            if(obj.pref!=undefined){
                let pref=JSON.parse(obj.pref);
                if(pref.booksPref.length>0){
                   var categories=pref.booksPref[0];
                    for(let i=1;i<pref.booksPref.length;i++){
                        categories=categories+','+pref.booksPref[i];
                    }
                    api_get(api_url+'/books',categories,keyword);
                }
                else{
                    api_get(api_url+'/books',null,keyword);
                }
            }
            else{
                api_get(api_url+'/books',null,keyword);
            }
           });
           
        }else{
            chrome.storage.sync.get('pref',function(obj){
                if(obj.pref!=undefined){
                    let pref=JSON.parse(obj.pref);
                    if(pref.booksPref.length>0){
                       var categories=pref.booksPref[0];
                        for(let i=1;i<pref.booksPref.length;i++){
                            categories=categories+','+pref.booksPref[i];
                        }
                        api_get(api_url+'/books',categories,null);
                    }
                    else{
                        api_get(api_url+'/books',null,null);
                    }
                }
                else{
                    api_get(api_url+'/books',null,null);
                }
            });   
        }   
    }
});