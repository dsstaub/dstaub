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

const editModal = document.getElementById('editModal');
const editTitle = document.getElementById('editTitle');
const editName = document.getElementById('editName');
const editCategory = document.getElementById('editCategory');
const editMinutes = document.getElementById('editMinutes');
const editTip = document.getElementById('editTip');
const editInHouse = document.getElementById('editInHouse');
const saveBtn = document.getElementById('saveBtn');
const deleteBtn = document.getElementById('deleteBtn');
const cancelEdit = document.getElementById('cancelEdit');

let allFoods = [];
let showInHouse = false;
let currentFood = null;
let currentFoodId = null;
let countdownInterval = null;
let longPressTimer = null;

// Apply Theme
function applyTheme() {
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.documentElement.classList.add('dark');
    document.documentElement.classList.remove('light');
  } else {
    document.documentElement.classList.add('light');
    document.documentElement.classList.remove('dark');
  }
}
applyTheme();
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', applyTheme);

// Render Food Cards
function renderFoods(filter = '') {
  buttonsContainer.innerHTML = "";
  allFoods
    .filter(f => f.data.name.toLowerCase().includes(filter.toLowerCase()))
    .filter(f => !showInHouse || f.data.inHouse)
    .forEach(({ id, data }) => {
      const card = document.createElement('div');
      card.className = 'food-card';
      card.innerHTML = `
        <div class="food-name">${data.name}</div>
        <div class="food-category">${data.category || 'Uncategorized'}</div>
      `;

card.addEventListener('touchstart', (e) => {
  card.dataset.maybeTap = "true";
  card.dataset.longPressTriggered = "false";
  longPressTimer = setTimeout(() => {
    openEditModal(id, data);
    card.style.transform = 'scale(1.1)';
    setTimeout(() => card.style.transform = '', 200);
    card.dataset.longPressTriggered = "true";
  }, 500);
});

card.addEventListener('touchmove', (e) => {
  card.dataset.maybeTap = "false"; // No longer a real tap
  clearTimeout(longPressTimer);    // Cancel long-press too!
});

card.addEventListener('touchend', (e) => {
  clearTimeout(longPressTimer);
  if (card.dataset.longPressTriggered !== "true" && card.dataset.maybeTap === "true") {
    openPreviewModal(data);
  }
});

card.addEventListener('mousedown', (e) => {
  card.dataset.longPressTriggered = "false";
  longPressTimer = setTimeout(() => {
    openEditModal(id, data);
    card.style.transform = 'scale(1.1)';
    setTimeout(() => card.style.transform = '', 200);
    card.dataset.longPressTriggered = "true";
  }, 500);
});

card.addEventListener('mouseup', (e) => {
  clearTimeout(longPressTimer);
  if (card.dataset.longPressTriggered !== "true") {
    openPreviewModal(data);
  }
});

      card.addEventListener('mouseleave', () => clearTimeout(longPressTimer));

      buttonsContainer.appendChild(card);
    });
}

// Load Foods
function loadFoods() {
  db.collection('cooking_timers').onSnapshot(snapshot => {
    allFoods = [];
    snapshot.forEach(doc => {
      allFoods.push({ id: doc.id, data: doc.data() });
    });
    renderFoods(searchInput.value);
  });
}

// Open Pre-Cook Info Modal
function openPreviewModal(food) {
  currentFood = food;
  modalName.textContent = food.name;
  modalCategory.textContent = food.category || "Uncategorized";
  modalMinutes.textContent = food.minutes || 0;
  modalTip.textContent = food.tip || '';
  modal.style.display = "flex";
}

// Start Timer
function startTimer(minutes) {
  if (!minutes) return;
  if (navigator.vibrate) navigator.vibrate(100);
  overlay.style.display = "flex";
  let seconds = minutes * 60;
  updateOverlay(seconds);

  countdownInterval = setInterval(() => {
    seconds--;
    updateOverlay(seconds);
    if (seconds <= 0) {
      clearInterval(countdownInterval);
      overlayTimer.textContent = "DONE!";
    }
  }, 1000);
}

function updateOverlay(seconds) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  overlayTimer.textContent = `${m}:${s.toString().padStart(2, '0')}`;
}

function cancelTimer() {
  clearInterval(countdownInterval);
  overlay.style.display = "none";
}

// Open Add/Edit Modal
function openEditModal(id, data) {
  currentFoodId = id || null;
  editTitle.textContent = id ? "Edit Timer" : "Add New Timer";
  editName.value = data ? data.name : '';
  editCategory.value = data ? data.category : '';
  editMinutes.value = data ? data.minutes : '';
  editTip.value = data ? data.tip : '';
  editInHouse.checked = data ? data.inHouse : false;
  deleteBtn.style.display = id ? "block" : "none";
  editModal.style.display = "flex";
}

// Save Timer
function saveTimer() {
  const food = {
    name: editName.value.trim(),
    category: editCategory.value.trim(),
    minutes: parseInt(editMinutes.value.trim()),
    tip: editTip.value.trim(),
    inHouse: editInHouse.checked
  };
  if (currentFoodId) {
    db.collection('cooking_timers').doc(currentFoodId).update(food);
  } else {
    db.collection('cooking_timers').add(food);
  }
  editModal.style.display = "none";
}

// Delete Timer
function deleteTimer() {
  if (confirm("Are you sure you want to delete this timer?")) {
    db.collection('cooking_timers').doc(currentFoodId).delete();
    editModal.style.display = "none";
  }
}

// Events
searchInput.addEventListener('input', () => renderFoods(searchInput.value));
inHouseToggle.addEventListener('click', () => {
  showInHouse = !showInHouse;
  inHouseToggle.classList.toggle('in-house-active', showInHouse);
  renderFoods(searchInput.value);
});
addTimer.addEventListener('click', () => openEditModal(null, null));
startBtn.addEventListener('click', () => {
  modal.style.display = "none";
  startTimer(currentFood.minutes);
});
cancelPreview.addEventListener('click', () => modal.style.display = "none");
cancelBtn.addEventListener('click', cancelTimer);
saveBtn.addEventListener('click', saveTimer);
deleteBtn.addEventListener('click', deleteTimer);
cancelEdit.addEventListener('click', () => editModal.style.display = "none");

// Init
loadFoods();