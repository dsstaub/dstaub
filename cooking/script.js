// Firebase Init
const firebaseConfig = { 
      apiKey: "AIzaSyBYYAjY8Q7RH0jQuMeOmAAp3XPTGLAQr0k",
      authDomain: "code-tools-pastebin.firebaseapp.com",
      projectId: "code-tools-pastebin",
      storageBucket: "code-tools-pastebin.appspot.com",
      messagingSenderId: "1000713658548",
      appId: "1:1000713658548:web:4996a3a58b1f3fd013b7e1"
 };
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Elements
const buttonsContainer = document.getElementById('buttons');
const searchInput = document.getElementById('searchInput');
const inHouseToggle = document.getElementById('inHouseToggle');
const addTimer = document.getElementById('addTimer');
const modal = document.getElementById('modal');
const modalName = document.getElementById('modalName');
const modalCategory = document.getElementById('modalCategory');
const modalMinutes = document.getElementById('modalMinutes');
const modalTip = document.getElementById('modalTip');
const startBtn = document.getElementById('startBtn');
const cancelPreview = document.getElementById('cancelPreview');
const overlay = document.getElementById('overlay');
const overlayTimer = document.getElementById('overlayTimer');
const cancelBtn = document.getElementById('cancelBtn');

let allFoods = [];
let showInHouse = false;
let currentFood = null;
let countdownInterval = null;

function applyTheme() {
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
}
applyTheme();
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', applyTheme);

function renderFoods() {
  buttonsContainer.innerHTML = "";
  allFoods
    .filter(f => f.name.toLowerCase().includes(searchInput.value.toLowerCase()))
    .filter(f => !showInHouse || f.inHouse)
    .forEach(food => {
      const card = document.createElement('div');
      card.className = 'food-card';
      card.innerHTML = `<div class="food-name">${food.name}</div><div>${food.category}</div>`;
      card.onclick = () => openPreviewModal(food);
      buttonsContainer.appendChild(card);
    });
}

function loadFoods() {
  db.collection('cooking_timers').onSnapshot(snapshot => {
    allFoods = snapshot.docs.map(doc => doc.data());
    renderFoods();
  });
}

function openPreviewModal(food) {
  currentFood = food;
  modalName.textContent = food.name;
  modalCategory.textContent = food.category;
  modalMinutes.textContent = food.minutes;
  modalTip.textContent = food.tip;
  modal.classList.remove('hidden');
}

function startTimer() {
  let seconds = currentFood.minutes * 60;
  overlayTimer.textContent = `${Math.floor(seconds / 60)}:${seconds % 60}`;
  overlay.classList.remove('hidden');
}

searchInput.addEventListener('input', renderFoods);
startBtn.addEventListener('click', startTimer);
cancelPreview.addEventListener('click', () => modal.classList.add('hidden'));
cancelBtn.addEventListener('click', () => overlay.classList.add('hidden'));

loadFoods();
