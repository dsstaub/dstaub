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

// Apply PWA class if needed
if (window.matchMedia('(display-mode: standalone)').matches) {
  document.body.classList.add('pwa-mode');
}

document.addEventListener("DOMContentLoaded", () => {
  // Top header
  document.body.insertAdjacentHTML("afterbegin", `
    <header class="sticky top-0 z-40 flex items-center gap-4 py-4 px-6 bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 backdrop-blur-md">
      <img src="/icons/icon-512x512.png" alt="Logo" class="w-8 h-8 rounded-sm">
      <h1 class="text-xl font-semibold text-zinc-900 dark:text-zinc-100">DStaub</h1>
    </header>
  `);

  // Bottom nav
  document.body.insertAdjacentHTML("beforeend", `
    <nav id="bottomNav" class="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around h-24 bg-zinc-200/95 dark:bg-zinc-900/95 backdrop-blur-sm border-t border-zinc-400 dark:border-zinc-700 shadow-lg text-sm font-semibold">
         style="padding-bottom: env(safe-area-inset-bottom, 0px);">
      <a href="/" class="nav-link">Home</a>
      <a href="/resume/" class="nav-link">Resumé</a>
      <a href="/music/" class="nav-link">Music</a>
      <a href="/links/" class="nav-link">Links</a>
    </nav>
  `);

  // Active link highlight
  const currentPath = window.location.pathname.replace(/\/$/, '');
  document.querySelectorAll('#bottomNav a').forEach(link => {
    const hrefPath = link.getAttribute('href').replace(/\/$/, '');
    if (hrefPath === currentPath) {
      link.classList.add('text-cyan-500', 'dark:text-cyan-400', 'underline', 'active');
    }
  });
});
