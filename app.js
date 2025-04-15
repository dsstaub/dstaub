// (1) Page fade-in and default expanded sections
window.addEventListener('DOMContentLoaded', () => {
  document.body.classList.remove('opacity-0');

  // Open sections by default
  toggleSection('summary');
  toggleSection('skills');
  toggleSection('contact');

  // Add bottom padding to prevent content behind nav
  document.body.classList.add('pb-28');
});

// (2) Theme toggle
const toggleBtn = document.getElementById('toggleTheme');
const themeLabel = document.getElementById('themeLabel');
const html = document.documentElement;
const currentTheme = localStorage.getItem('theme') || 'dark';

function applyTheme(theme) {
  html.classList.toggle('dark', theme === 'dark');
  themeLabel.textContent = theme === 'dark' ? 'Light' : 'Dark';
  localStorage.setItem('theme', theme);
}

toggleBtn.addEventListener('click', () => {
  const newTheme = html.classList.contains('dark') ? 'light' : 'dark';
  applyTheme(newTheme);
});

applyTheme(currentTheme);

// (3) Collapsible slide transition
function toggleSection(id) {
  const section = document.getElementById(id);
  const arrow = document.getElementById('arrow-' + id);
  const isOpen = section.style.maxHeight && section.style.maxHeight !== '0px';

  if (isOpen) {
    section.style.maxHeight = '0';
    arrow.style.transform = 'rotate(0deg)';
  } else {
    section.style.maxHeight = section.scrollHeight + 'px';
    arrow.style.transform = 'rotate(180deg)';
  }
}

// (4) PWA auto-update handling
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./service-worker.js').then(registration => {
    registration.onupdatefound = () => {
      const installingWorker = registration.installing;
      installingWorker.onstatechange = () => {
        if (installingWorker.state === 'installed') {
          if (navigator.serviceWorker.controller) {
            console.log('New content is available; please refresh.');
            installingWorker.postMessage({ action: 'skipWaiting' });
          } else {
            console.log('Content is cached for offline use.');
          }
        }
      };
    };
  }).catch(err => console.error('Service Worker failed:', err));
}
