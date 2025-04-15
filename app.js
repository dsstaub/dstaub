// (1) Page fade-in
window.addEventListener('DOMContentLoaded', () => {
  document.body.classList.remove('opacity-0');
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

// (4) Version Auto Refresher
// In your main JavaScript file (e.g., app.js)

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./service-worker.js').then(registration => {
    registration.onupdatefound = () => {
      const installingWorker = registration.installing;
      installingWorker.onstatechange = () => {
        if (installingWorker.state === 'installed') {
          if (navigator.serviceWorker.controller) {
            // New update available
            console.log('New content is available; please refresh.');
            // Optionally, you can force the update:
            installingWorker.postMessage({ action: 'skipWaiting' });
          } else {
            // Content is cached for offline use
            console.log('Content is cached for offline use.');
          }
        }
      };
    };
  });
}

// (5) PWA service worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js')
    .then(reg => console.log('Service Worker registered:', reg))
    .catch(err => console.error('Service Worker failed:', err));
}
