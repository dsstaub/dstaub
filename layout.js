// layout.js

// Apply saved theme immediately to avoid flash
const savedTheme = localStorage.getItem('theme') || 'dark';
document.documentElement.classList.toggle('dark', savedTheme === 'dark');

document.addEventListener("DOMContentLoaded", () => {
  // Inject header + menu + backdrop
  document.body.insertAdjacentHTML("afterbegin", `
    <header class="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-3 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800">
      <button id="menuToggle" class="text-black dark:text-white">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
      <h1 class="text-xl font-bold">DStaub</h1>
      <div class="w-6"></div>
    </header>

    <div id="sideMenu" class="fixed top-0 left-0 h-full w-64 bg-white dark:bg-zinc-900 text-black dark:text-white shadow-lg transform -translate-x-full transition-transform duration-300 z-40">
      <div class="p-5 border-b border-zinc-200 dark:border-zinc-800 font-bold text-lg">Menu</div>
      <nav class="flex flex-col p-4 space-y-3">
        <a href="/tools/">Work Tools</a>
        <a href="/photos/">Photos</a>
        <a href="/other/">Other</a>
        <a href="/" class="text-cyan-500 hover:text-cyan-400">← Back to Home</a>
        <button id="toggleTheme" class="mt-6 px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800">
          <span id="themeLabel">${savedTheme === 'dark' ? 'Light' : 'Dark'}</span> Mode
        </button>
      </nav>
    </div>

    <div id="backdrop" class="fixed inset-0 bg-black/40 backdrop-blur-sm z-30 hidden"></div>
  `);

  // Hamburger menu logic
  const menuToggle = document.getElementById('menuToggle');
  const sideMenu = document.getElementById('sideMenu');
  const backdrop = document.getElementById('backdrop');

  function closeMenu() {
    sideMenu.classList.add('-translate-x-full');
    backdrop.classList.add('hidden');
  }

  function openMenu() {
    sideMenu.classList.remove('-translate-x-full');
    backdrop.classList.remove('hidden');
  }

  menuToggle?.addEventListener('click', () => {
    const isOpen = !sideMenu.classList.contains('-translate-x-full');
    isOpen ? closeMenu() : openMenu();
  });

  backdrop?.addEventListener('click', closeMenu);

  // Defer theme toggle binding until after DOM inject
  setTimeout(() => {
    const toggleBtn = document.getElementById('toggleTheme');
    const themeLabel = document.getElementById('themeLabel');
    const html = document.documentElement;

    function applyTheme(theme) {
      if (theme === 'dark') {
        html.classList.add('dark');
      } else {
        html.classList.remove('dark');
      }
      localStorage.setItem('theme', theme);
      if (themeLabel) themeLabel.textContent = theme === 'dark' ? 'Light' : 'Dark';
    }

    toggleBtn?.addEventListener('click', () => {
      const newTheme = html.classList.contains('dark') ? 'light' : 'dark';
      applyTheme(newTheme);
    });

    applyTheme(savedTheme);
  }, 0);
});
