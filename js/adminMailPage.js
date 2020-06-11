function checkToken(){
    const token = localStorage.getItem('x-auth-token');
    if(!token){
        window.location.href = '/';
    }else{
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == 4) {   
            if (xmlhttp.status == 200) {
                ready(function(data){
                    document.getElementById('pageWrapper').classList.remove('hide');
                    let messages = data.mesages;
                    let received = document.getElementById("received-list");
                    let sent = document.getElementById("sent-list");
                    messages.forEach(element => {
                        console.log(element);
                        let listElement = document.createElement('LI');
                        listElement.setAttribute('x-id', element._id);

                        let bullet = document.createElement('IMG');
                        bullet.innerHTML = 'FROM : ';

                        let userName = document.createElement('I');

                        if(element.isUser && element.username){
                            userName.innerHTML = element.username;
                        }else{
                            userName.innerHTML = element.email;
                        }

                        let divContainer = document.createElement('DIV');
                        let divContainerSpan = document.createElement('P');

                        divContainer.classList.add('header-message');
                        if(element.message.length > 80){
                            divContainerSpan.innerHTML = element.message.substr(0, 80) + '...';
                        }else{
                            divContainerSpan.innerHTML = element.message.substr(0, 80);
                        }

                        let viewMoreLink = document.createElement("A");
                        viewMoreLink.classList.add("view_more_link");
                        viewMoreLink.setAttribute('href', 'javascript:void(0);');
                        viewMoreLink.onclick = function(){toggle_visibility(element._id)};
            
                        let utext = document.createElement("U");
                        utext.innerHTML = 'Read More';

                        let divHidden = document.createElement('DIV');
                        divHidden.classList.add('hidden');

                        let spanText = document.createElement('P');
                        spanText.innerHTML = element.message;

                        

                        if(element.response){
                            bullet.classList.add('green-bullet');
                            bullet.setAttribute('src','https://img.icons8.com/emoji/48/000000/green-circle-emoji.png');
                            bullet.setAttribute('alt', 'response');
                        }else{
                            bullet.classList.add('gray-bullet');
                            bullet.setAttribute('src','https://img.icons8.com/material-two-tone/24/000000/circle-thin.png');
                            bullet.setAttribute('alt', 'not response');
                        }

                        let form = document.createElement('FORM');
                        
                        let formText = document.createElement('TEXTAREA');
                        formText.setAttribute('name', 'responseText');
                        formText.innerHTML = 'Thank you for your feedback.';

                        let formButton = document.createElement('INPUT');
                        formButton.setAttribute('type', 'submit');
                        formButton.setAttribute('value', 'Send');
                        form.appendChild(formText);
                        form.appendChild(formButton);

                        divHidden.appendChild(spanText);

                        if(!element.response){
                            form.onsubmit = function(e){
                                e.preventDefault();

                                let formData = new FormData(this);
                                const text = formData.get('responseText');
                                const id = listElement.getAttribute('x-id');

                                if(text && text != ''){
                                    var xmlhttp = new XMLHttpRequest();
                                    const token = localStorage.getItem('x-auth-token');
                                    xmlhttp.onreadystatechange = function() {
                                        if (xmlhttp.readyState == 4) {   
                                            if (xmlhttp.status == 200) {
                                                location.reload();
                                            }
                                            else if (xmlhttp.status != 500) {
                                                const data = JSON.parse(xmlhttpAdd.responseText);
                                                alert(data.message);
                                            }
                                            else {
                                                alert('Something bad happened. Try again later');
                                            }
                                        }
                                    };
                                
                                    xmlhttp.open('PUT', '/admin/messages', true);
                                    xmlhttp.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
                                    xmlhttp.setRequestHeader('x-auth-token', token);
                                
                                    xmlhttp.send(JSON.stringify({
                                        id: id,
                                        message: text
                                    }));
                                }

                            }
                            divHidden.appendChild(form);
                        }

                        viewMoreLink.appendChild(utext);
                        divContainer.appendChild(divContainerSpan);
                        divContainer.appendChild(viewMoreLink);


                        listElement.appendChild(bullet);
                        listElement.appendChild(userName);
                        listElement.appendChild(divContainer);
                        listElement.appendChild(divHidden);

                        received.appendChild(listElement);

                        if(element.response){

                            let listElement = document.createElement('LI');
                            listElement.setAttribute('x-id', element._id);
    
                            let bullet = document.createElement('SPAN');
                            bullet.innerHTML = 'TO : ';
    
                            let userName = document.createElement('I');
    
                            if(element.isUser && element.username){
                                userName.innerHTML = element.username;
                            }else{
                                userName.innerHTML = element.email;
                            }
    
                            let divContainer = document.createElement('DIV');
                            let divContainerSpan = document.createElement('P');
    
                            divContainer.classList.add('header-message');
                            if(element.message.length > 80){
                                divContainerSpan.innerHTML = element.response.substr(0, 80) + '...';
                            }else{
                                divContainerSpan.innerHTML = element.response.substr(0, 80);
                            }
    
                            let viewMoreLink = document.createElement("A");
                            viewMoreLink.classList.add("view_more_link");
                            viewMoreLink.setAttribute('href', 'javascript:void(0);');
                            viewMoreLink.onclick = function(){toggle_visibility(element._id)};
                
                            let utext = document.createElement("U");
                            utext.innerHTML = 'Read More';
    
                            let divHidden = document.createElement('DIV');
                            divHidden.classList.add('hidden');
    
                            let spanText = document.createElement('P');
                            spanText.innerHTML = element.response;
                           
                            divHidden.appendChild(spanText);
                            viewMoreLink.appendChild(utext);
                            divContainer.appendChild(divContainerSpan);
                            divContainer.appendChild(viewMoreLink);
    
    
                            listElement.appendChild(bullet);
                            listElement.appendChild(userName);
                            listElement.appendChild(divContainer);
                            listElement.appendChild(divHidden);

                            sent.appendChild(listElement);
                        }

                    });

                    document.getElementById('csvButton').addEventListener('click', function(){

                        let csvContent = '';
                        let dataString = '';

                        let messagesArr = [['id', 'email', 'username', 'message', 'response', 'date']];

                        messages.forEach((infoArray, index) => {
                            let line = [];
                            line.push(`"${infoArray._id}"`);
                            line.push(`"${infoArray.email}"`);
                            line.push(`"${infoArray.username}"`);
                            line.push(`"${infoArray.message}"`);
                            line.push(`"${infoArray.response}"`);
                            line.push(`"${infoArray.createdAt}"`);

                            messagesArr.push(line);
                        });

                        messagesArr.forEach((infoArray, index) => {
                            dataString = infoArray.join(',');
                            csvContent += dataString + '\n';
                        });

                        download(csvContent, 'messages.csv', 'text/csv;encoding:utf-8');
                    });
                }, JSON.parse(xmlhttp.responseText));
            }
            else {
                window.location.href = '/';
            }
            }
        };
        xmlhttp.open('GET', '/admin/messages', true);
        xmlhttp.setRequestHeader('x-auth-token', token);
        xmlhttp.send();
    }
}

function ready(fn, data) {
    if (document.readyState != 'loading'){
      fn(data);
    } else {
      document.addEventListener('DOMContentLoaded', fn);
    }
}

checkToken();


//taken from https://stackoverflow.com/questions/14964035/how-to-export-javascript-array-info-to-csv-on-client-side
var download = function(content, fileName, mimeType) {
    var a = document.createElement('a');
    mimeType = mimeType || 'application/octet-stream';
  
    if (navigator.msSaveBlob) { // IE10
      navigator.msSaveBlob(new Blob([content], {
        type: mimeType
      }), fileName);
    } else if (URL && 'download' in a) { //html5 A[download]
      a.href = URL.createObjectURL(new Blob([content], {
        type: mimeType
      }));
      a.setAttribute('download', fileName);
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } else {
      location.href = 'data:application/octet-stream,' + encodeURIComponent(content); // only this mime type is supported
    }
  }