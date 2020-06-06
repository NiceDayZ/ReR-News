function ready(fn) {
    if (document.readyState != 'loading'){
      fn();
    } else {
      document.addEventListener('DOMContentLoaded', fn);
    }
  }

ready(function(){
    const token = localStorage.getItem('x-auth-token');
    if(token){
        window.location.href = '/';
    }
})

var activeState = "register";
document.getElementById("change_login").addEventListener("click", function () {
    document.getElementById("register").classList.toggle("box_sign_up");
    document.getElementById("login").classList.toggle("box_sign_up");

    if (activeState == "register") {
        document.getElementById("change_login").setAttribute("value", "Sign Up");
        activeState = "login";
    } else {
        document.getElementById("change_login").setAttribute("value", "Sign In");
        activeState = "register";
    }
});
document.getElementById("change_register").addEventListener("click", function () {
    document.getElementById("register").classList.toggle("box_sign_up");
    document.getElementById("login").classList.toggle("box_sign_up");

    if (activeState == "register") {
        document.getElementById("change_login").setAttribute("value", "Sign In");

        activeState = "login";
    } else {
        document.getElementById("change_login").setAttribute("value", "Sign Up");;

        activeState = "register";
    }
});


document.getElementById("login_form").onsubmit = function(e){
    e.preventDefault();
    const form = document.getElementById("login_form");
    const data = new FormData(form);

    const email = data.get('email');
    const pass = data.get('password');

    const json = JSON.stringify({
        email: email,
        password: pass
    })
    
    var xmlhttp = new XMLHttpRequest();
    
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4) {   
           if (xmlhttp.status == 200) {
               const data = JSON.parse(xmlhttp.responseText);
               localStorage.setItem('x-auth-token', data.token);
               window.location.href = '/';
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

    xmlhttp.open('POST', '/user/login', true);
    xmlhttp.setRequestHeader('Content-Type', 'application/json; charset=utf-8') 
    xmlhttp.send(json);
};

document.getElementById("register_form").onsubmit = function(e){
    e.preventDefault();
    const form = document.getElementById("register_form");
    const data = new FormData(form);

    const email = data.get('email');
    const pass = data.get('password');
    const name = data.get('name');
    const username = data.get('username');

    const json = JSON.stringify({
        email: email,
        password: pass,
        name: name,
        userName: username
    })
    
    var xmlhttp = new XMLHttpRequest();
    
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4) {   
           if (xmlhttp.status == 200) {
               alert('An Email was send in your inbox for confirmation');
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

    xmlhttp.open('POST', '/user/register', true);
    xmlhttp.setRequestHeader('Content-Type', 'application/json; charset=utf-8') 
    xmlhttp.send(json);
};