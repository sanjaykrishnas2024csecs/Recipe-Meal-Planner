/**
 * TasteCraft — Recipe & Meal Planner App Logic
 * Pure Vanilla JavaScript (ES6+) with zero external dependencies.
 */

// --- Global Application State ---
const AppState = {
  recipes: [],
  favorites: [],
  mealPlan: {},
  customGroceries: [],
  checkedGroceries: {},
  currentFilterCategory: 'All',
  currentFilterDiet: 'All',
  searchQuery: '',
  activeView: 'recipes',
  selectedRecipeForDetail: null,
  activeServingsScale: 1
};

const DAYS_OF_WEEK = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const MEAL_SLOTS = ['breakfast', 'lunch', 'dinner', 'snack'];

// --- Local Storage Keys ---
const STORAGE_KEYS = {
  CUSTOM_RECIPES: 'tastecraft_custom_recipes',
  FAVORITES: 'tastecraft_favorites',
  MEAL_PLAN: 'tastecraft_meal_plan',
  CUSTOM_GROCERIES: 'tastecraft_custom_groceries',
  CHECKED_GROCERIES: 'tastecraft_checked_groceries'
};

// --- Initialization ---
document.addEventListener('DOMContentLoaded', () => {
  initializeApp();
});

function initializeApp() {
  loadStoredData();
  setupEventListeners();
  updateMetricsBar();
  renderCurrentView();
}

function loadStoredData() {
  // Load custom recipes and merge with initial dataset
  const savedCustom = JSON.parse(localStorage.getItem(STORAGE_KEYS.CUSTOM_RECIPES) || '[]');
  AppState.recipes = [...INITIAL_RECIPES, ...savedCustom];

  // Load favorites
  AppState.favorites = JSON.parse(localStorage.getItem(STORAGE_KEYS.FAVORITES) || '[]');

  // Load or initialize Meal Plan grid
  const savedPlan = JSON.parse(localStorage.getItem(STORAGE_KEYS.MEAL_PLAN) || 'null');
  if (savedPlan) {
    AppState.mealPlan = savedPlan;
  } else {
    // Default empty week
    AppState.mealPlan = {};
    DAYS_OF_WEEK.forEach(day => {
      AppState.mealPlan[day] = { breakfast: null, lunch: null, dinner: null, snack: null };
    });
    // Add 2 friendly defaults so the planner isn't totally blank on first visit
    AppState.mealPlan['Monday'].breakfast = 'rec-1';
    AppState.mealPlan['Monday'].lunch = 'rec-2';
    AppState.mealPlan['Wednesday'].dinner = 'rec-3';
    saveMealPlan();
  }

  // Load custom grocery items and checked items
  AppState.customGroceries = JSON.parse(localStorage.getItem(STORAGE_KEYS.CUSTOM_GROCERIES) || '[]');
  AppState.checkedGroceries = JSON.parse(localStorage.getItem(STORAGE_KEYS.CHECKED_GROCERIES) || '{}');
}

function saveMealPlan() {
  localStorage.setItem(STORAGE_KEYS.MEAL_PLAN, JSON.stringify(AppState.mealPlan));
}

// --- Navigation & View Switching ---
function switchView(viewName) {
  AppState.activeView = viewName;
  
  // Update nav buttons
  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.view === viewName);
  });

  // Toggle view containers
  document.querySelectorAll('.view-panel').forEach(panel => {
    panel.classList.toggle('active-view', panel.id === `view-${viewName}`);
  });

  renderCurrentView();
}

function renderCurrentView() {
  if (AppState.activeView === 'recipes' || AppState.activeView === 'favorites') {
    renderRecipes();
  } else if (AppState.activeView === 'planner') {
    renderPlanner();
  } else if (AppState.activeView === 'grocery') {
    renderGroceryList();
  }
  updateMetricsBar();
}

// --- Metrics & Counters ---
function updateMetricsBar() {
  const totalRecipesEl = document.getElementById('metric-total-recipes');
  const totalPlannedEl = document.getElementById('metric-total-planned');
  const favCountBadge = document.getElementById('badge-fav-count');

  if (totalRecipesEl) totalRecipesEl.textContent = AppState.recipes.length;

  // Count planned meals
  let plannedCount = 0;
  DAYS_OF_WEEK.forEach(day => {
    MEAL_SLOTS.forEach(slot => {
      if (AppState.mealPlan[day] && AppState.mealPlan[day][slot]) {
        plannedCount++;
      }
    });
  });
  if (totalPlannedEl) totalPlannedEl.textContent = plannedCount;
  if (favCountBadge) favCountBadge.textContent = AppState.favorites.length;
}

// --- Event Listeners Setup ---
function setupEventListeners() {
  // Navigation tabs
  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', () => switchView(btn.dataset.view));
  });

  // Search input
  const searchInput = document.getElementById('search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      AppState.searchQuery = e.target.value.trim().toLowerCase();
      renderRecipes();
    });
  }

  // Category filters
  document.querySelectorAll('.filter-category').forEach(chip => {
    chip.addEventListener('click', () => {
      document.querySelectorAll('.filter-category').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      AppState.currentFilterCategory = chip.dataset.category;
      renderRecipes();
    });
  });

  // Dietary filters
  document.querySelectorAll('.filter-diet').forEach(chip => {
    chip.addEventListener('click', () => {
      document.querySelectorAll('.filter-diet').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      AppState.currentFilterDiet = chip.dataset.diet;
      renderRecipes();
    });
  });

  // Modal Closers
  document.querySelectorAll('.modal-overlay').forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal || e.target.closest('.modal-close-btn')) {
        closeAllModals();
      }
    });
  });

  // Add Custom Recipe Button & Form
  const openAddRecipeModalBtn = document.getElementById('btn-open-add-recipe');
  if (openAddRecipeModalBtn) {
    openAddRecipeModalBtn.addEventListener('click', () => {
      document.getElementById('modal-add-recipe').classList.add('active');
    });
  }

  const addRecipeForm = document.getElementById('form-add-recipe');
  if (addRecipeForm) {
    addRecipeForm.addEventListener('submit', handleAddCustomRecipe);
  }

  // Add to Plan Form submit
  const planAssignForm = document.getElementById('form-assign-plan');
  if (planAssignForm) {
    planAssignForm.addEventListener('submit', handleAssignToPlanSubmit);
  }

  // Clear Week Button
  const clearWeekBtn = document.getElementById('btn-clear-week');
  if (clearWeekBtn) {
    clearWeekBtn.addEventListener('click', () => {
      if (confirm('Are you sure you want to clear all planned meals for the week?')) {
        DAYS_OF_WEEK.forEach(day => {
          AppState.mealPlan[day] = { breakfast: null, lunch: null, dinner: null, snack: null };
        });
        saveMealPlan();
        renderPlanner();
        updateMetricsBar();
        showToast('Weekly meal plan reset!');
      }
    });
  }

  // Print Plan Button
  const printPlanBtn = document.getElementById('btn-print-plan');
  if (printPlanBtn) {
    printPlanBtn.addEventListener('click', () => {
      window.print();
    });
  }

  // Add Grocery Item Form
  const addGroceryForm = document.getElementById('form-add-grocery');
  if (addGroceryForm) {
    addGroceryForm.addEventListener('submit', handleAddCustomGrocery);
  }

  // Clear Checked Grocery Items
  const clearCheckedBtn = document.getElementById('btn-clear-checked-grocery');
  if (clearCheckedBtn) {
    clearCheckedBtn.addEventListener('click', () => {
      AppState.checkedGroceries = {};
      localStorage.setItem(STORAGE_KEYS.CHECKED_GROCERIES, JSON.stringify(AppState.checkedGroceries));
      renderGroceryList();
      showToast('Completed items cleared!');
    });
  }
}

// --- Recipe Rendering ---
function renderRecipes() {
  const container = document.getElementById('recipes-container');
  if (!container) return;

  let filtered = AppState.recipes;

  // Favorites filter tab
  if (AppState.activeView === 'favorites') {
    filtered = filtered.filter(r => AppState.favorites.includes(r.id));
  }

  // Category filter
  if (AppState.currentFilterCategory !== 'All') {
    filtered = filtered.filter(r => r.category.toLowerCase() === AppState.currentFilterCategory.toLowerCase());
  }

  // Dietary filter
  if (AppState.currentFilterDiet !== 'All') {
    filtered = filtered.filter(r => r.diet && r.diet.includes(AppState.currentFilterDiet));
  }

  // Search filter
  if (AppState.searchQuery) {
    filtered = filtered.filter(r => 
      r.title.toLowerCase().includes(AppState.searchQuery) ||
      r.description.toLowerCase().includes(AppState.searchQuery) ||
      r.ingredients.some(i => i.name.toLowerCase().includes(AppState.searchQuery))
    );
  }

  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 3rem 1rem; color: var(--text-muted);">
        <p style="font-size: 2rem; margin-bottom: 0.5rem;">🥗</p>
        <h3 style="color: var(--text-title); margin-bottom: 0.5rem;">No recipes found</h3>
        <p>Try adjusting your search keywords or active dietary filters.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(recipe => {
    const isFav = AppState.favorites.includes(recipe.id);
    const tagsHtml = recipe.diet.slice(0, 2).map(tag => `<span class="tag-badge">${escapeHtml(tag)}</span>`).join('');
    
    return `
      <div class="recipe-card" data-id="${recipe.id}">
        <div class="card-media">
          <img src="${recipe.image}" alt="${escapeHtml(recipe.title)}" class="card-img" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=800&q=80'" />
          <span class="card-badge-top">🔥 ${recipe.calories} kcal</span>
          <button class="card-fav-btn ${isFav ? 'is-fav' : ''}" onclick="toggleFavorite('${recipe.id}', event)" title="Toggle Favorite">
            ${isFav ? '❤️' : '🤍'}
          </button>
        </div>
        <div class="card-content">
          <div class="card-meta">
            <span>⏱️ ${recipe.prepTime} mins</span>
            <span>•</span>
            <span>🍽️ ${escapeHtml(recipe.category)}</span>
          </div>
          <h3 class="card-title">${escapeHtml(recipe.title)}</h3>
          <p class="card-desc">${escapeHtml(recipe.description)}</p>
          <div class="card-tags">
            ${tagsHtml}
          </div>
          <div class="card-actions">
            <button class="btn-secondary" onclick="openRecipeDetailModal('${recipe.id}')">View Recipe</button>
            <button class="btn-primary" onclick="openPlanModal('${recipe.id}')">+ Plan</button>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

// --- Favorite Toggle ---
function toggleFavorite(recipeId, event) {
  if (event) event.stopPropagation();
  const index = AppState.favorites.indexOf(recipeId);
  if (index === -1) {
    AppState.favorites.push(recipeId);
    showToast('Saved to your Favorites! ❤️');
  } else {
    AppState.favorites.splice(index, 1);
    showToast('Removed from Favorites');
  }
  localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(AppState.favorites));
  renderCurrentView();
}

// --- Recipe Detail Modal with Dynamic Servings Scaler ---
function openRecipeDetailModal(recipeId) {
  const recipe = AppState.recipes.find(r => r.id === recipeId);
  if (!recipe) return;

  AppState.selectedRecipeForDetail = recipe;
  AppState.activeServingsScale = recipe.servings || 1;

  renderRecipeDetailModalContent();
  document.getElementById('modal-recipe-detail').classList.add('active');
}

function adjustServings(delta) {
  if (!AppState.selectedRecipeForDetail) return;
  const newServings = AppState.activeServingsScale + delta;
  if (newServings < 1 || newServings > 12) return;
  AppState.activeServingsScale = newServings;
  renderRecipeDetailModalContent();
}

function renderRecipeDetailModalContent() {
  const recipe = AppState.selectedRecipeForDetail;
  if (!recipe) return;

  const originalServings = recipe.servings || 1;
  const ratio = AppState.activeServingsScale / originalServings;

  const modalBody = document.getElementById('detail-modal-body');
  
  const scaledCalories = Math.round(recipe.calories * ratio);
  const scaledProtein = Math.round(recipe.nutrition.protein * ratio);
  const scaledCarbs = Math.round(recipe.nutrition.carbs * ratio);
  const scaledFat = Math.round(recipe.nutrition.fat * ratio);

  // Scaled Ingredients
  const ingredientsHtml = recipe.ingredients.map(ing => {
    const scaledAmount = Number((ing.amount * ratio).toFixed(2));
    return `
      <li class="ingredient-item">
        <span><strong>${scaledAmount} ${escapeHtml(ing.unit)}</strong> ${escapeHtml(ing.name)}</span>
        <span style="font-size: 0.8rem; color: var(--text-light);">${escapeHtml(ing.department)}</span>
      </li>
    `;
  }).join('');

  // Instructions with check-off steps
  const instructionsHtml = recipe.instructions.map((step, idx) => `
    <div class="step-item">
      <div class="step-num">${idx + 1}</div>
      <p class="step-text">${escapeHtml(step)}</p>
    </div>
  `).join('');

  modalBody.innerHTML = `
    <img src="${recipe.image}" alt="${escapeHtml(recipe.title)}" class="detail-media" onerror="this.src='https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=800&q=80'" />
    <span class="tag-badge" style="background: var(--primary-subtle); color: var(--primary); font-weight: 700; margin-bottom: 0.5rem; display: inline-block;">
      ${escapeHtml(recipe.category)}
    </span>
    <h2 class="detail-title">${escapeHtml(recipe.title)}</h2>
    <p style="color: var(--text-muted); margin-bottom: 1rem;">${escapeHtml(recipe.description)}</p>

    <!-- Nutrition Overview -->
    <div class="nutrition-bar">
      <div class="nutri-box">
        <div class="label">Calories</div>
        <div class="value">${scaledCalories}</div>
      </div>
      <div class="nutri-box">
        <div class="label">Protein</div>
        <div class="value">${scaledProtein}g</div>
      </div>
      <div class="nutri-box">
        <div class="label">Carbs</div>
        <div class="value">${scaledCarbs}g</div>
      </div>
      <div class="nutri-box">
        <div class="label">Fat</div>
        <div class="value">${scaledFat}g</div>
      </div>
    </div>

    <!-- Interactive Servings Scaler -->
    <div class="servings-scaler">
      <div>
        <span style="font-weight: 700; color: var(--text-title); display: block;">Adjust Servings</span>
        <span style="font-size: 0.8rem; color: var(--text-muted);">Ingredients recalculate dynamically</span>
      </div>
      <div class="scaler-controls">
        <button class="scale-btn" onclick="adjustServings(-1)" title="Decrease Servings">−</button>
        <span class="servings-number">${AppState.activeServingsScale}</span>
        <button class="scale-btn" onclick="adjustServings(1)" title="Increase Servings">+</button>
      </div>
    </div>

    <h3 style="font-size: 1.15rem; margin-bottom: 0.75rem; color: var(--text-title);">🛒 Ingredients</h3>
    <ul class="ingredients-list">
      ${ingredientsHtml}
    </ul>

    <h3 style="font-size: 1.15rem; margin-bottom: 0.75rem; color: var(--text-title);">👨‍🍳 Preparation Steps</h3>
    <div class="instructions-list">
      ${instructionsHtml}
    </div>

    <div style="margin-top: 2rem; display: flex; gap: 0.75rem; justify-content: flex-end;">
      <button class="btn-primary" onclick="closeAllModals(); openPlanModal('${recipe.id}')">
        + Add to Weekly Meal Plan
      </button>
    </div>
  `;
}

// --- Meal Planner Grid & Logic ---
function renderPlanner() {
  const container = document.getElementById('planner-grid-container');
  if (!container) return;

  container.innerHTML = DAYS_OF_WEEK.map(day => {
    const dayPlan = AppState.mealPlan[day] || { breakfast: null, lunch: null, dinner: null, snack: null };
    
    // Calculate total calories for this day
    let totalDayCalories = 0;
    MEAL_SLOTS.forEach(slot => {
      const recId = dayPlan[slot];
      if (recId) {
        const recipe = AppState.recipes.find(r => r.id === recId);
        if (recipe) totalDayCalories += recipe.calories;
      }
    });

    const slotsHtml = MEAL_SLOTS.map(slot => {
      const recId = dayPlan[slot];
      const recipe = recId ? AppState.recipes.find(r => r.id === recId) : null;

      if (recipe) {
        return `
          <div class="meal-slot">
            <span class="slot-label">${slot}</span>
            <div class="slot-card">
              <button class="slot-remove-btn" onclick="removeMealFromPlan('${day}', '${slot}')" title="Remove meal">✕</button>
              <img src="${recipe.image}" class="slot-thumb" alt="${escapeHtml(recipe.title)}" onerror="this.src='https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=400&q=80'" />
              <div class="slot-title" title="${escapeHtml(recipe.title)}">${escapeHtml(recipe.title)}</div>
              <div class="slot-cal">${recipe.calories} kcal</div>
            </div>
          </div>
        `;
      } else {
        return `
          <div class="meal-slot">
            <span class="slot-label">${slot}</span>
            <div class="slot-empty" onclick="promptAddMealToSlot('${day}', '${slot}')">
              + Add
            </div>
          </div>
        `;
      }
    }).join('');

    return `
      <div class="planner-day-col">
        <div class="day-header">
          <div class="day-name">${day}</div>
          <div class="day-calories">${totalDayCalories > 0 ? `${totalDayCalories} kcal` : '0 kcal'}</div>
        </div>
        <div class="meal-slots">
          ${slotsHtml}
        </div>
      </div>
    `;
  }).join('');
}

function removeMealFromPlan(day, slot) {
  if (AppState.mealPlan[day]) {
    AppState.mealPlan[day][slot] = null;
    saveMealPlan();
    renderPlanner();
    updateMetricsBar();
    showToast(`Removed meal from ${day} ${slot}`);
  }
}

function promptAddMealToSlot(day, slot) {
  document.getElementById('plan-assign-day').value = day;
  document.getElementById('plan-assign-slot').value = slot;
  populateRecipeSelectorForPlan();
  document.getElementById('modal-assign-plan').classList.add('active');
}

function openPlanModal(recipeId) {
  populateRecipeSelectorForPlan(recipeId);
  document.getElementById('modal-assign-plan').classList.add('active');
}

function populateRecipeSelectorForPlan(selectedRecipeId = null) {
  const selectEl = document.getElementById('plan-assign-recipe');
  if (!selectEl) return;
  selectEl.innerHTML = AppState.recipes.map(r => `
    <option value="${r.id}" ${r.id === selectedRecipeId ? 'selected' : ''}>
      ${escapeHtml(r.title)} (${r.calories} kcal)
    </option>
  `).join('');
}

function handleAssignToPlanSubmit(e) {
  e.preventDefault();
  const day = document.getElementById('plan-assign-day').value;
  const slot = document.getElementById('plan-assign-slot').value;
  const recipeId = document.getElementById('plan-assign-recipe').value;

  if (!AppState.mealPlan[day]) AppState.mealPlan[day] = {};
  AppState.mealPlan[day][slot] = recipeId;

  saveMealPlan();
  closeAllModals();
  showToast(`Added to ${day} ${slot}! ✨`);
  renderCurrentView();
}

// --- Smart Grocery List Generation ---
function renderGroceryList() {
  const container = document.getElementById('grocery-list-container');
  if (!container) return;

  // Aggregate items across all meals planned
  const ingredientsMap = {};

  DAYS_OF_WEEK.forEach(day => {
    MEAL_SLOTS.forEach(slot => {
      const recId = AppState.mealPlan[day] ? AppState.mealPlan[day][slot] : null;
      if (recId) {
        const recipe = AppState.recipes.find(r => r.id === recId);
        if (recipe && recipe.ingredients) {
          recipe.ingredients.forEach(item => {
            const key = `${item.name.toLowerCase()}_${item.unit.toLowerCase()}`;
            if (!ingredientsMap[key]) {
              ingredientsMap[key] = {
                name: item.name,
                unit: item.unit,
                amount: 0,
                department: item.department || 'Pantry'
              };
            }
            ingredientsMap[key].amount += Number(item.amount);
          });
        }
      }
    });
  });

  // Group items by Department
  const departments = {};
  
  // 1. Add plan ingredients
  Object.values(ingredientsMap).forEach(item => {
    const dept = item.department;
    if (!departments[dept]) departments[dept] = [];
    departments[dept].push({
      id: `plan-${item.name}`,
      name: item.name,
      qty: `${Number(item.amount.toFixed(1))} ${item.unit}`,
      isCustom: false
    });
  });

  // 2. Add custom ingredients
  if (AppState.customGroceries.length > 0) {
    if (!departments['Custom Items']) departments['Custom Items'] = [];
    AppState.customGroceries.forEach(item => {
      departments['Custom Items'].push({
        id: item.id,
        name: item.name,
        qty: item.qty || '1 item',
        isCustom: true
      });
    });
  }

  const deptKeys = Object.keys(departments);
  if (deptKeys.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 2.5rem 1rem; color: var(--text-muted);">
        <p style="font-size: 2.5rem; margin-bottom: 0.5rem;">🛒</p>
        <h3 style="color: var(--text-title); margin-bottom: 0.5rem;">Your Grocery List is Empty</h3>
        <p>Assign recipes in the <strong>Weekly Meal Planner</strong> or type custom grocery items above to automatically populate your shopping list.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = deptKeys.map(dept => {
    const items = departments[dept];
    const itemsHtml = items.map(item => {
      const isChecked = !!AppState.checkedGroceries[item.id];
      return `
        <li class="grocery-item ${isChecked ? 'checked' : ''}" id="item-${item.id}">
          <div class="grocery-item-left">
            <input type="checkbox" class="custom-checkbox" ${isChecked ? 'checked' : ''} onchange="toggleGroceryCheck('${item.id}')" />
            <span class="grocery-name">${escapeHtml(item.name)}</span>
          </div>
          <div class="grocery-item-right">
            <span class="grocery-qty">${escapeHtml(item.qty)}</span>
            ${item.isCustom ? `<button class="btn-del-item" onclick="deleteCustomGrocery('${item.id}')" title="Delete">🗑️</button>` : ''}
          </div>
        </li>
      `;
    }).join('');

    return `
      <div class="grocery-category-group">
        <h4 class="category-title">🥦 ${escapeHtml(dept)}</h4>
        <ul class="grocery-item-list">
          ${itemsHtml}
        </ul>
      </div>
    `;
  }).join('');
}

function toggleGroceryCheck(itemId) {
  AppState.checkedGroceries[itemId] = !AppState.checkedGroceries[itemId];
  localStorage.setItem(STORAGE_KEYS.CHECKED_GROCERIES, JSON.stringify(AppState.checkedGroceries));
  const el = document.getElementById(`item-${itemId}`);
  if (el) {
    el.classList.toggle('checked', AppState.checkedGroceries[itemId]);
  }
}

function handleAddCustomGrocery(e) {
  e.preventDefault();
  const input = document.getElementById('input-custom-grocery');
  const val = input.value.trim();
  if (!val) return;

  const newItem = {
    id: `custom-${Date.now()}`,
    name: val,
    qty: '1 pkg'
  };

  AppState.customGroceries.push(newItem);
  localStorage.setItem(STORAGE_KEYS.CUSTOM_GROCERIES, JSON.stringify(AppState.customGroceries));
  input.value = '';
  renderGroceryList();
  showToast('Item added to grocery list!');
}

function deleteCustomGrocery(id) {
  AppState.customGroceries = AppState.customGroceries.filter(i => i.id !== id);
  localStorage.setItem(STORAGE_KEYS.CUSTOM_GROCERIES, JSON.stringify(AppState.customGroceries));
  renderGroceryList();
}

// --- Custom Recipe Submission ---
function handleAddCustomRecipe(e) {
  e.preventDefault();
  const title = document.getElementById('recipe-form-title').value.trim();
  const category = document.getElementById('recipe-form-category').value;
  const prepTime = parseInt(document.getElementById('recipe-form-time').value, 10) || 20;
  const calories = parseInt(document.getElementById('recipe-form-calories').value, 10) || 450;
  const image = document.getElementById('recipe-form-image').value.trim() || 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=800&q=80';
  const description = document.getElementById('recipe-form-desc').value.trim();
  const rawIngredients = document.getElementById('recipe-form-ingredients').value.trim();
  const rawInstructions = document.getElementById('recipe-form-instructions').value.trim();

  // Parse ingredients
  const ingredients = rawIngredients.split('\n').filter(line => line.trim()).map(line => {
    return { name: line.trim(), amount: 1, unit: 'serving', department: 'Produce' };
  });

  // Parse instructions
  const instructions = rawInstructions.split('\n').filter(line => line.trim());

  const newRecipe = {
    id: `custom-rec-${Date.now()}`,
    title,
    category,
    diet: ['Homemade'],
    prepTime,
    calories,
    servings: 2,
    image,
    description: description || 'Delicious homemade recipe.',
    nutrition: { protein: 25, carbs: 40, fat: 15 },
    ingredients: ingredients.length > 0 ? ingredients : [{ name: 'Love & Spices', amount: 1, unit: 'pinch', department: 'Pantry' }],
    instructions: instructions.length > 0 ? instructions : ['Prepare fresh ingredients and cook until golden brown. Enjoy warm!']
  };

  // Save custom recipe
  const savedCustom = JSON.parse(localStorage.getItem(STORAGE_KEYS.CUSTOM_RECIPES) || '[]');
  savedCustom.unshift(newRecipe);
  localStorage.setItem(STORAGE_KEYS.CUSTOM_RECIPES, JSON.stringify(savedCustom));

  AppState.recipes.unshift(newRecipe);
  e.target.reset();
  closeAllModals();
  renderCurrentView();
  showToast('New recipe created successfully! 🍳');
}

// --- Utilities ---
function closeAllModals() {
  document.querySelectorAll('.modal-overlay').forEach(modal => modal.classList.remove('active'));
}

function showToast(message) {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<span>✨</span><span>${escapeHtml(message)}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    setTimeout(() => toast.remove(), 300);
  }, 2600);
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
