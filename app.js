// app.js

window.addEventListener('DOMContentLoaded', () => {
  document.body.classList.remove('opacity-0');

  // Default open sections
  toggleSection('summary');
  toggleSection('skills');
  toggleSection('contact');
});

function toggleSection(id) {
  const section = document.getElementById(id);
  const arrow = document.getElementById(`arrow-${id}`);
  section.classList.toggle("open");
  arrow.classList.toggle("rotate-180");
}