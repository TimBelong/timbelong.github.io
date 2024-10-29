"use strict;"

function setTheme(themeName) {
  localStorage.setItem('theme', themeName);
  document.documentElement.className = themeName;
}

function toggleTheme() {
  if (localStorage.getItem('theme') === 'theme-dark') {
      setTheme('theme-light');
      document.getElementById('slider').checked = false;
  } else {
      setTheme('theme-dark');
      document.getElementById('slider').checked = true;
  }
}

(function() {
  if (localStorage.getItem('theme') === 'theme-light') {
      setTheme('theme-light');
      document.getElementById('slider').checked = false;
  } else {
      setTheme('theme-dark');
      document.getElementById('slider').checked = true;
  }
})();

(function () {
    if (localStorage.getItem('theme') === 'theme-dark') {
        setTheme('theme-dark');
        document.getElementById('slider').checked = true;
    } else {
        setTheme('theme-light');
        document.getElementById('slider').checked = false;
    }
})();

const burgerBtn = document.querySelector('.burger__menu'),
      mobileMenu = document.querySelector('nav ul');

burgerBtn.addEventListener('click', ()=>{
  burgerBtn.classList.toggle('_active');
  mobileMenu.classList.toggle('_active');
})