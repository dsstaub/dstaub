// app.js +

window.addEventListener('DOMContentLoaded', () => {
  document.body.classList.remove('opacity-0');

  // Default open sections
  toggleSection('summary');
  toggleSection('skills');
  toggleSection('contact');
});

function toggleSection(id) {
  const section = document.getElementById(id);
  const arrow = document.getElementById('arrow-' + id);
  const isOpen = section.style.maxHeight && section.style.maxHeight !== '0px';
  section.style.maxHeight = isOpen ? '0' : section.scrollHeight + 'px';
  arrow.style.transform = isOpen ? 'rotate(0deg)' : 'rotate(180deg)';
 }
