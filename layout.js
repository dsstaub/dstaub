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
    <header class="sticky top-0 z-50 flex items-center justify-center gap-3 px-4 pt-4 pb-1 backdrop-blur-md bg-black/40 border-b border-white/10 shadow-sm">
      <img src="/icons/icon-512x512.png" alt="Logo" class="w-24 h-24 rounded-md">
      <h1 class="text-lg font-semibold text-white tracking-wide">DStaub</h1>
    </header>
  `);

  // Bottom nav
document.body.insertAdjacentHTML("beforeend", `
  <nav id="bottomNav"
    class="fixed bottom-0 left-0 right-0 z-50 w-full flex items-center justify-around h-16 bg-zinc-200 dark:bg-zinc-900 text-zinc-800 dark:text-white font-sans backdrop-blur-sm border-t border-zinc-400 dark:border-zinc-700 shadow-lg text-sm font-semibold"
    style="padding-bottom: env(safe-area-inset-bottom, 0px);">
      <a href="/index.html" class="flex flex-col items-center hover:text-cyan-500">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M3 9.75L12 3l9 6.75V21a.75.75 0 01-.75.75H3.75A.75.75 0 013 21V9.75z" />
        </svg>
        Home
      </a>
      <a href="/resume/index.html" class="flex flex-col items-center hover:text-cyan-500">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25V5.25a2.25 2.25 0 00-2.25-2.25h-10.5A2.25 2.25 0 004.5 5.25v13.5A2.25 2.25 0 006.75 21h10.5a2.25 2.25 0 002.25-2.25v-4.5zM8.25 9.75h7.5M8.25 12.75h7.5M8.25 15.75h4.5" />
        </svg>
        Resumé
      </a>
      <a href="/music/index.html" class="flex flex-col items-center hover:text-cyan-500">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9 19.5v-6.75a2.25 2.25 0 012.25-2.25h4.5a2.25 2.25 0 012.25 2.25V19.5M6 19.5a2.25 2.25 0 01-2.25-2.25v-9a7.5 7.5 0 0115 0v9A2.25 2.25 0 0116.5 19.5" />
        </svg>
        Music
      </a>
      <a href="/links/index.html" class="flex flex-col items-center hover:text-cyan-500">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 9.75h1.5a3.75 3.75 0 013.75 3.75v0a3.75 3.75 0 01-3.75 3.75h-1.5m-3-7.5h-1.5a3.75 3.75 0 00-3.75 3.75v0a3.75 3.75 0 003.75 3.75h1.5m0-3h3" />
        </svg>
        Links
      </a>
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
