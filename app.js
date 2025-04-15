<script>
  window.addEventListener('DOMContentLoaded', () => {
    document.body.classList.remove('opacity-0');

    toggleSection('summary');
    toggleSection('skills');
    toggleSection('contact');

    // Hamburger Menu
    const menuToggle = document.getElementById('menuToggle');
    const sideMenu = document.getElementById('sideMenu');
    const backdrop = document.getElementById('backdrop');

    if (menuToggle && sideMenu && backdrop) {
      menuToggle.addEventListener('click', () => {
        sideMenu.classList.remove('-translate-x-full');
        backdrop.classList.remove('hidden');
      });

      backdrop.addEventListener('click', () => {
        sideMenu.classList.add('-translate-x-full');
        backdrop.classList.add('hidden');
      });
    }
  });

  // Theme toggle
  const toggleBtn = document.getElementById('toggleTheme');
  const themeLabel = document.getElementById('themeLabel');
  const html = document.documentElement;
  const currentTheme = localStorage.getItem('theme') || 'dark';

  function applyTheme(theme) {
    html.classList.toggle('dark', theme === 'dark');
    themeLabel.textContent = theme === 'dark' ? 'Light' : 'Dark';
    localStorage.setItem('theme', theme);
  }

  toggleBtn?.addEventListener('click', () => {
    const newTheme = html.classList.contains('dark') ? 'light' : 'dark';
    applyTheme(newTheme);
  });

  applyTheme(currentTheme);

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

  // PWA
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./service-worker.js').then(registration => {
      registration.onupdatefound = () => {
        const installingWorker = registration.installing;
        installingWorker.onstatechange = () => {
          if (installingWorker.state === 'installed') {
            if (navigator.serviceWorker.controller) {
              console.log('New content available');
              installingWorker.postMessage({ action: 'skipWaiting' });
            } else {
              console.log('Content cached for offline use');
            }
          }
        };
      };
    }).catch(err => console.error('Service Worker failed:', err));
  }
</script>
