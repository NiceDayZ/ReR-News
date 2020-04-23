var activeState = "register";
document.getElementById("change_login").addEventListener("click", function () {
    document.getElementById("register").classList.toggle("box_sign_up");
    document.getElementById("login").classList.toggle("box_sign_up");

    if (activeState == "register") {
        document.getElementById("change_login").innerHTML = "Sign Up";
        activeState = "login";
    } else {
        document.getElementById("change_login").innerHTML = "Sign In";
        activeState = "register";
    }
});
document.getElementById("change_register").addEventListener("click", function () {
    document.getElementById("register").classList.toggle("box_sign_up");
    document.getElementById("login").classList.toggle("box_sign_up");

    if (activeState == "register") {
        document.getElementById("change_login").innerHTML = "Sign In";

        activeState = "login";
    } else {
        document.getElementById("change_login").innerHTML = "Sign Up";

        activeState = "register";
    }
});

