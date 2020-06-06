document.getElementsByClassName('menu-toggle')[0].addEventListener('click', function () {
    document.getElementsByClassName('nav')[0].classList.toggle('showing');
    document.getElementsByClassName('nav')[0].getElementsByClassName('profile-subnav')[0].classList.toggle('showing');
  });