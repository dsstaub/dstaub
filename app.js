// app.js

window.addEventListener('DOMContentLoaded', () => {
  document.body.classList.remove('opacity-0');

  // Scroll-aware header logic
  let lastScrollY = window.scrollY;
  const header = document.getElementById('mainHeader');

  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > lastScrollY && currentScrollY > 48) {
      header.classList.add('hide'); // scroll down = hide header
    } else {
      header.classList.remove('hide'); // scroll up = show header
    }

    lastScrollY = currentScrollY;
  });

  // Optional: remove if not using collapsible sections anymore
  toggleSection('summary');
  toggleSection('skills');
  toggleSection('contact');
});

function toggleSection(id) {
  const section = document.getElementById(id);
  const arrow = document.getElementById(`arrow-${id}`);
  if (section && arrow) {
    section.classList.toggle("open");
    arrow.classList.toggle("rotate-180");
  }
}