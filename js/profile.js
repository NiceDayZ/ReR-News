document.getElementsByClassName('menu-toggle')[0].addEventListener('click', function () {
    document.getElementsByClassName('nav')[0].classList.toggle('showing');
    document.getElementsByClassName('nav')[0].getElementsByClassName('profile-subnav')[0].classList.toggle('showing');
});
    
document.getElementById("name").addEventListener("click", function () {
    if (document.getElementById("edit-name").style.display == 'none') {
        document.getElementById("edit-name").style.display = 'block';
        document.getElementById("password-edit").style.display = 'none';
        document.getElementById("username-edit").style.display = 'none';
    }
    else {
        document.getElementById("edit-name").style.display = 'none';
    }
})
document.getElementById("submit-name").addEventListener("click", function () {
    document.getElementById("edit-name").style.display = 'none';
})
document.getElementById("submit-username").addEventListener("click", function () {
    document.getElementById("username-edit").style.display = 'none';
})
document.getElementById("submit-password").addEventListener("click", function () {
    document.getElementById("password-edit").style.display = 'none';
})
document.getElementById("username").addEventListener("click", function () {
    if (document.getElementById("username-edit").style.display == 'none') {
        document.getElementById("username-edit").style.display = 'block';
        document.getElementById("edit-name").style.display = 'none';
        document.getElementById("password-edit").style.display = 'none';
    }
    else {
        document.getElementById("username-edit").style.display = 'none';
    }

})
document.getElementById("pass-edit-button").addEventListener("click", function () {
    if (document.getElementById("password-edit").style.display == 'none') {
        document.getElementById("password-edit").style.display = 'block';
        document.getElementById("username-edit").style.display = 'none';
        document.getElementById("edit-name").style.display = 'none';
    }
    else {
        document.getElementById("password-edit").style.display = 'none';
    }

})

document.getElementById("update-profile").addEventListener("click", function () {
    if (document.getElementById("male").checked === true) {
        document.getElementById("user-info").style.backgroundImage = 'url(../images/profile-man-avatar.jpg)';
    }
    else {
        document.getElementById("user-info").style.backgroundImage = 'url(../images/profile-woman-avatar.jpg)';
    }
})