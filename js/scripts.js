
document.getElementsByClassName('menu-toggle')[0].addEventListener('click', function(){
  document.getElementsByClassName('nav')[0].classList.toggle('showing');
  document.getElementsByClassName('nav')[0].getElementsByClassName('profile-subnav')[0].classList.toggle('showing');
});


document.getElementById("nextButton").addEventListener('click', function(){
  
  var childNode = document.getElementsByClassName("post")[0];
  var parentNode = childNode.parentNode;

  parentNode.removeChild(childNode);
  parentNode.appendChild(childNode);
});

document.getElementById("prevButton").addEventListener('click', function(){

  var childNode = document.getElementsByClassName('post')[document.getElementsByClassName('post').length-1];
  var parentNode = childNode.parentNode;

  parentNode.removeChild(childNode);
  parentNode.insertBefore(childNode, document.getElementsByClassName('post')[0]);

});