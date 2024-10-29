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
      // Установить темную тему по умолчанию
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