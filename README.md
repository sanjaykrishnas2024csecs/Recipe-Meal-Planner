# 🍳 TasteCraft — Smart Recipe & Weekly Meal Planning Web App

> A modern, responsive recipe catalog and meal planning web application developed for the **Web Programming** course. Built purely with semantic HTML5, modern CSS3 (Custom Properties & Grid/Flexbox), and modular Vanilla JavaScript (ES6+).

---

## 🔗 Project Links

- 🌐 **Live Website Link**: `https://sanjaykrishnas2024csecs.github.io/Recipe-Meal-Planner/` *(or Vercel: `https://recipe-meal-planner.vercel.app`)*
- 💻 **GitHub Repository**: `https://github.com/sanjaykrishnas2024csecs/Recipe-Meal-Planner`

---

## 🎨 UI/UX Theme & Design System

The application is styled with a custom **"Fresh Herb & Warm Saffron"** culinary design system:
- **Primary Color**: Emerald Sage (`#10B981`) — represents fresh vegetables, wholesome ingredients, and healthy habits.
- **Accent Color**: Warm Saffron (`#F59E0B`) — evokes warm ovens, spices, and appetizing baked dishes.
- **Backgrounds**: Soft Alabaster (`#F8FAF9`) with crisp white elevated cards and subtle multi-layer box shadows.
- **Typography**: 
  - *Headings*: `Playfair Display` (editorial culinary magazine feel).
  - *Body / UI*: `Plus Jakarta Sans` (ultra-clean readability for timers, ingredients, and steps).
- **Micro-Interactions**: Glassmorphism navbar (`backdrop-filter: blur(12px)`), scale-on-hover recipe cards, and floating toast notifications.

---

## ✨ Key Features & Technical Highlights

### 1. 🔍 Instant Search & Multi-Tag Filtering
- Real-time client-side search across recipe titles, descriptions, and individual ingredient names.
- Category filters: *All*, *Breakfast*, *Lunch*, *Dinner*.
- Dietary tags: *Vegetarian*, *Vegan*, *High-Protein*, *Quick (<20m)*.

### 2. ⚖️ Interactive Servings Scaler (Dynamic DOM Manipulation)
- In the recipe modal, users can click `+` or `−` to scale servings from 1 to 12.
- Ingredient quantities, units, and nutritional metrics (Calories, Protein, Carbs, Fat) dynamically recalculate and re-render in real-time.

### 3. 📅 7-Day Weekly Meal Planner Board
- Interactive 7-column layout (Monday through Sunday) with 4 slots per day (*Breakfast*, *Lunch*, *Dinner*, *Snacks*).
- Real-time daily calorie counter automatically sums the calories of all dishes planned on each day.
- Direct slot assignment from either the calendar board or recipe cards.

### 4. 🛒 Smart Grocery List Auto-Aggregator
- Automatically crawls all meals assigned across the 7-day planner, combines ingredient quantities, and organizes items into grocery aisles (*Produce*, *Dairy & Refrigerated*, *Meat & Seafood*, *Pantry*, *Spices & Baking*).
- Interactive strikethrough checkoffs and support for adding custom pantry items.

### 5. 💾 Data Persistence (HTML5 `localStorage`)
- All user modifications—custom recipes, bookmarked favorites, meal planner slots, and grocery checklist states—persist across browser reloads.

---

## 📁 File Structure

```
recipe-meal-planner/
├── index.html          # Semantic HTML5 markup, navigation tabs, and modal templates
├── styles.css          # Modern CSS3 stylesheet, design variables, and responsive layout
├── app.js              # Core application logic, DOM controllers, and state management
├── recipes-data.js     # Default curated culinary dataset with nutritional metrics
└── README.md           # Project documentation, deployment guide, and submission details
```

---

## 🚀 How to Run Locally

Because this project uses Pure Vanilla Web Technologies:
1. **Option 1 (Instant)**: Simply double-click `index.html` to open it in any web browser (Chrome, Edge, Firefox, Safari).
2. **Option 2 (Live Server)**: If using VS Code, right-click `index.html` and choose **Open with Live Server**.

---

## 🌐 How to Publish to GitHub & Create Your Live Link

### Step 1: Initialize Git and Push to GitHub

Open PowerShell or Terminal in this project folder:

```bash
# 1. Initialize git
git init

# 2. Stage all files
git add .

# 3. Create your first commit
git commit -m "feat: complete recipe and meal planner web app"

# 4. Set main branch
git branch -M main

# 5. Link your GitHub repository (replace with your repo URL)
git remote add origin https://github.com/sanjaykrishnas2024csecs/Recipe-Meal-Planner.git

# 6. Push code to GitHub
git push -u origin main
```

### Step 2: Enable GitHub Pages (Free Live Website Link)

1. Navigate to your repository on [GitHub](https://github.com).
2. Click **Settings** (tab at the top right of the repo).
3. In the left sidebar, click **Pages**.
4. Under **Build and deployment** -> **Branch**, select `main` and root `/(root)`, then click **Save**.
5. Wait 1-2 minutes. GitHub will provide your live website link:
   👉 `https://sanjaykrishnas2024csecs.github.io/Recipe-Meal-Planner/`

### Alternative: Deploy on Vercel (1-Click)
1. Go to [vercel.com](https://vercel.com) and log in with your GitHub account.
2. Click **Add New** -> **Project** -> Select `recipe-meal-planner`.
3. Click **Deploy**. Vercel will immediately deploy and give you an instant `.vercel.app` URL!

---

## 📝 Academic Submission Information

- **Course**: Web Programming
- **Developer / Student**: Sanjay Krishna
- **Project Topic**: Recipe & Meal Planning Application
- **Technologies Used**: HTML5, CSS3, JavaScript (ES6+), LocalStorage API
- **License**: MIT
