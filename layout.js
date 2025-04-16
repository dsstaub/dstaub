// layout.js -- global layout + metadata injection

// Inject essential <head> tags early (for favicon + iOS support)
const headTags = [
  {
    tag: "link",
    rel: "icon",
    type: "image/png",
    sizes: "32x32",
    href: "/icons/favicon-32x32.png",
  },
  {
    tag: "link",
    rel: "apple-touch-icon",
    href: "/icons/icon-192x192.png",
  },
  {
    tag: "link",
    rel: "manifest",
    href: "/manifest.json",
  },
  {
    tag: "meta",
    name: "apple-mobile-web-app-capable",
    content: "yes",
  },
  {
    tag: "meta",
    name: "apple-mobile-web-app-status-bar-style",
    content: "black-translucent",
  },
  {
    tag: "meta",
    name: "theme-color",
    content: "#111111",
  },
];

headTags.forEach(({ tag, ...attrs }) => {
  const el = document.createElement(tag);
  Object.entries(attrs).forEach(([key, val]) => el.setAttribute(key, val));
  document.head.appendChild(el);
});

// Add PWA-mode class if running standalone
if (window.matchMedia('(display-mode: standalone)').matches) {
  document.body.classList.add('pwa-mode');
}

document.addEventListener("DOMContentLoaded", () => {
  // Set a CSS variable for safe area inset top (for any future use)
  document.documentElement.style.setProperty('--safe-top', 'env(safe-area-inset-top, 0px)');

  // Inject bottom nav instead of top header
  document.body.insertAdjacentHTML("beforeend", `
    <nav class="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around py-3 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md border-t border-zinc-200 dark:border-zinc-800"
         style="padding-bottom: env(safe-area-inset-bottom, 0px);">
      <a href="/resume/" class="text-cyan-500 hover:text-cyan-400 text-sm font-medium">Resumé</a>
      <a href="/music/" class="text-cyan-500 hover:text-cyan-400 text-sm font-medium">Music</a>
      <a href="/other/" class="text-cyan-500 hover:text-cyan-400 text-sm font-medium">Other</a>
      <a href="/" class="text-cyan-500 hover:text-cyan-400 text-sm font-medium">Home</a>
    </nav>
  `);
});

    <div id="sideMenu" class="fixed top-0 left-0 h-full w-64 bg-white dark:bg-zinc-900 text-black dark:text-white shadow-lg transform -translate-x-full transition-transform duration-300 z-40">
      <div class="p-5 border-b border-zinc-200 dark:border-zinc-800 font-bold text-lg">Menu</div>
      <nav class="flex flex-col p-4 space-y-3">
        <a href="/resume/">• Resumé •</a>
        <a href="/music/">• My Music •</a>
        <a href="/other/">• Other •</a>
        <a href="/" class="text-cyan-500 hover:text-cyan-400">← Back to Home</a>
      </nav>
    </div>

    <div id="backdrop" class="fixed inset-0 bg-black/40 backdrop-blur-sm z-30 hidden"></div>
  `);

  // Sidebar menu logic
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
});