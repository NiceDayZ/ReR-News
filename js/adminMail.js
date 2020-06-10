document.getElementsByClassName('menu-toggle')[0].addEventListener('click', function () {
    document.getElementsByClassName('nav')[0].classList.toggle('showing');
});

function toggle_visibility(id) {
    var e = document.getElementsByClassName(id);
    for (let i = 0; i < e.length; ++i) {
        if (e[i].style.display === 'none') {
            e[i].style.display = 'block';
            document.getElementsByClassName('green-bullet').src = "https://img.icons8.com/material-two-tone/24/000000/circle-thin.png";
        }
        else {
            e[i].style.display = 'none';
        }
    }
}

document.getElementById("send-button").addEventListener("click", function () {
    document.getElementById("receive-mails").style.display = 'none';
    document.getElementById("sent-mails").style.display = 'block';
})
document.getElementById("received-button").addEventListener("click", function () {
    document.getElementById("receive-mails").style.display = 'block';
    document.getElementById("sent-mails").style.display = 'none';
})