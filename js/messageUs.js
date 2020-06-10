document.getElementById('message-us-form').onsubmit = function(e){
    e.preventDefault();

    const token = localStorage.getItem('x-auth-token');
    let form = document.getElementById('message-us-form');
    let formData = new FormData(form);

    const email = formData.get('email');
    const message = formData.get('message');

    if(email && message && email != '' && message != ''){
        var xmlhttp = new XMLHttpRequest();

        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == 4) {   
                if (xmlhttp.status == 200) {
                    document.getElementById('email-input').value = '';
                    document.getElementById('message-input').value = '';
                    alert("Thank you for your message.");
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
    
        xmlhttp.open('POST', '/user/message', true);
        xmlhttp.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
        if(token){
            xmlhttp.setRequestHeader('x-auth-token', token);
        }
        xmlhttp.send(JSON.stringify({
            email: email,
            message: message
        }));
    }
}