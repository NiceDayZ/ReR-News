var content = document.getElementById("text");
var button = document.getElementById("extend");
var span = document.getElementsByClassName("close")[0];

button.onclick = function () {
    content.style.display = "block";
}
span.onclick = function () {
    content.style.display = "none";
}
window.onclick = function (event) {
    if (event.target == this.content) {
        this.content.style.display = "none";
    }
}