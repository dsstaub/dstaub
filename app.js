// app.js

window.addEventListener('DOMContentLoaded', () => {
  document.body.classList.remove('opacity-0');

  // Scroll-aware header logic
  let lastScrollY = window.scrollY;
  const header = document.getElementById('mainHeader');


function toggleSection(id) {
  const section = document.getElementById(id);
  const arrow = document.getElementById(`arrow-${id}`);
  if (section && arrow) {
    section.classList.toggle("open");
    arrow.classList.toggle("rotate-180");
  }
}