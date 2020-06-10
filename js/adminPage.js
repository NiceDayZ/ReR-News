function checkToken(){
    const token = localStorage.getItem('x-auth-token');
    if(!token){
        window.location.href = '/';
    }else{
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == 4) {   
            if (xmlhttp.status == 200) {
                ready(function(){
                    document.getElementById('viewButton').classList.remove('hide');
                    document.getElementById('mailboxButton').classList.remove('hide');
                });
            }
            else {
                window.location.href = '/';
            }
            }
        };
        xmlhttp.open('GET', '/admin/check', true);
        xmlhttp.setRequestHeader('x-auth-token', token);
        xmlhttp.send();
    }
}

function ready(fn) {
    if (document.readyState != 'loading'){
      fn();
    } else {
      document.addEventListener('DOMContentLoaded', fn);
    }
}

checkToken();