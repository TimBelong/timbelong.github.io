"use strict";

document.addEventListener('DOMContentLoaded', async () => {
    // Theme management
    const THEME_DARK = 'theme-dark';
    const THEME_LIGHT = 'theme-light';
    const themeSlider = document.getElementById('slider');

    function setTheme(themeName) {
        localStorage.setItem('theme', themeName);
        document.documentElement.className = themeName;
    }

    function toggleTheme() {
        const currentTheme = localStorage.getItem('theme');
        const newTheme = currentTheme === THEME_DARK ? THEME_LIGHT : THEME_DARK;
        setTheme(newTheme);
        themeSlider.checked = newTheme === THEME_DARK;
    }

    const darkThemeColors = { start: '#fcfcfc', end: '#fcfcfc', endOpacity: 0.18 };
    const lightThemeColors = { start: '#161513', end: '#161513', endOpacity: 0.18 };

    function updateGradientColors() {
        const theme = localStorage.getItem('theme');
        const colors = theme === THEME_DARK ? darkThemeColors : lightThemeColors;

        document.querySelectorAll('#paint_linear_dark stop').forEach((stop, index) => {
            stop.setAttribute('stop-color', index === 0 ? colors.start : colors.end);
            if (index === 1) stop.setAttribute('stop-opacity', colors.endOpacity);
        });

        document.querySelectorAll('#paint_linear_light stop').forEach((stop, index) => {
            stop.setAttribute('stop-color', index === 0 ? colors.start : colors.end);
            if (index === 1) stop.setAttribute('stop-opacity', colors.endOpacity);
        });
    }

    (function initializeTheme() {
        const savedTheme = localStorage.getItem('theme') || THEME_DARK;
        setTheme(savedTheme);
        themeSlider.checked = savedTheme === THEME_DARK;
    })();

    themeSlider.addEventListener('change', ()=>{
        toggleTheme();
        updateGradientColors();
    });

    // Mobile menu toggle
    const burgerBtn = document.querySelector('.burger__menu');
    const mobileMenu = document.querySelector('nav ul');

    burgerBtn.addEventListener('click', () => {
        burgerBtn.classList.toggle('_active');
        mobileMenu.classList.toggle('_active');
    });

    let translations = {};

    async function loadTranslations() {
        const response = await fetch('lang/en.json');
        translations = await response.json();
    }

    function setLanguage(lang) {
      document.querySelectorAll('[data-translate]').forEach(element => {
          const key = element.getAttribute('data-translate');
          if (translations[lang][key]) {
              element.innerText = translations[lang][key];
          }
      });
  }

    // Initialize translations
    await loadTranslations();
    setLanguage('en'); // Default language

    // Elements for current language button and dropdown
    const currentLangButton = document.getElementById('current-language');
    const dropdown = document.querySelector('.language-switcher .dropdown');
    const ruButton = dropdown.querySelector('[data-lang="ru"]');
    const enButton = dropdown.querySelector('[data-lang="en"]');

    // Show dropdown on current language button click
    currentLangButton.addEventListener('click', () => {
        dropdown.style.display = dropdown.style.display === 'none' ? 'block' : 'none';
    });

    // Update language and dropdown options on selection
    function updateLanguageOptions(selectedLang) {
        currentLangButton.innerText = selectedLang;
        
        // Display only the opposite language in the dropdown
        if (selectedLang === 'en') {
            ruButton.style.display = 'none';
            enButton.style.display = 'block';
        } else {
            ruButton.style.display = 'block';
            enButton.style.display = 'none';
        }
    }

    // Initial setup to show only the opposite language in the dropdown
    updateLanguageOptions('en');

    // Language selection and dropdown close
    dropdown.querySelectorAll('button').forEach(button => {
        button.addEventListener('click', () => {
            const selectedLang = button.getAttribute('data-lang');
            setLanguage(selectedLang);
            updateLanguageOptions(selectedLang);
            dropdown.style.display = 'none'; // Hide dropdown after selection
        });
    });

    // Hide dropdown if clicked outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.language-switcher')) {
            dropdown.style.display = 'none';
        }
    });

    updateGradientColors();
});
