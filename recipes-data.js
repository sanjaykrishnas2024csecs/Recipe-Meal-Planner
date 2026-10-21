/**
 * Default Recipe Dataset for TasteCraft Meal Planner
 * High-quality sample recipes with ingredients, measurements, instructions, and nutritional data.
 */

const INITIAL_RECIPES = [
  {
    id: "rec-1",
    title: "Avocado & Poached Egg Sourdough",
    category: "Breakfast",
    diet: ["Vegetarian", "High-Protein", "Quick (<20m)"],
    prepTime: 15,
    calories: 380,
    servings: 1,
    image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=800&q=80",
    description: "Crispy artisan sourdough toast topped with creamy mashed avocado, fresh lime, chili flakes, and a delicate runny poached egg.",
    nutrition: { protein: 18, carbs: 32, fat: 22 },
    ingredients: [
      { name: "Sourdough Bread Slice", amount: 1, unit: "slice", department: "Pantry" },
      { name: "Ripe Avocado", amount: 0.5, unit: "whole", department: "Produce" },
      { name: "Fresh Eggs", amount: 1, unit: "large", department: "Dairy & Refrigerated" },
      { name: "Lime Juice", amount: 1, unit: "tsp", department: "Produce" },
      { name: "Red Pepper Chili Flakes", amount: 0.5, unit: "tsp", department: "Spices & Baking" },
      { name: "Sea Salt & Black Pepper", amount: 1, unit: "pinch", department: "Spices & Baking" }
    ],
    instructions: [
      "Toast the sourdough slice until golden and crunchy.",
      "In a small bowl, roughly mash the avocado with lime juice, salt, and freshly ground pepper.",
      "Bring a small pot of water with a dash of vinegar to a gentle simmer, swirl to create a whirlpool, and slide in the egg. Poach for 3 minutes.",
      "Spread the mashed avocado generously over the warm toast.",
      "Top with the drained poached egg and garnish with chili flakes."
    ]
  },
  {
    id: "rec-2",
    title: "Mediterranean Quinoa Bowl",
    category: "Lunch",
    diet: ["Vegetarian", "Vegan", "Gluten-Free"],
    prepTime: 25,
    calories: 460,
    servings: 2,
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80",
    description: "Fluffy quinoa tossed with crisp English cucumbers, kalamata olives, cherry tomatoes, and zesty lemon-herb dressing.",
    nutrition: { protein: 15, carbs: 58, fat: 19 },
    ingredients: [
      { name: "Tri-Color Quinoa", amount: 1, unit: "cup", department: "Pantry" },
      { name: "Cherry Tomatoes", amount: 1, unit: "cup", department: "Produce" },
      { name: "English Cucumber", amount: 1, unit: "medium", department: "Produce" },
      { name: "Kalamata Olives", amount: 0.5, unit: "cup", department: "Pantry" },
      { name: "Extra Virgin Olive Oil", amount: 2, unit: "tbsp", department: "Pantry" },
      { name: "Fresh Lemon Juice", amount: 2, unit: "tbsp", department: "Produce" },
      { name: "Feta Cheese (Optional)", amount: 0.25, unit: "cup", department: "Dairy & Refrigerated" }
    ],
    instructions: [
      "Rinse quinoa under cold water. Boil with 2 cups of water for 15 minutes until tender and water is absorbed.",
      "Dice the cucumber and halve the cherry tomatoes and kalamata olives.",
      "Whisk olive oil, lemon juice, salt, and dried oregano in a small bowl for dressing.",
      "In a large bowl, fluff quinoa with a fork and let cool slightly.",
      "Combine quinoa with vegetables, pour dressing over, and gently toss before serving."
    ]
  },
  {
    id: "rec-3",
    title: "Garlic Butter Pan-Seared Salmon",
    category: "Dinner",
    diet: ["High-Protein", "Low-Carb", "Gluten-Free"],
    prepTime: 20,
    calories: 520,
    servings: 2,
    image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=800&q=80",
    description: "Crispy skin wild-caught salmon fillets basted in golden garlic butter and garnished with fresh dill and lemon wedges.",
    nutrition: { protein: 44, carbs: 3, fat: 36 },
    ingredients: [
      { name: "Salmon Fillets", amount: 2, unit: "fillets (6oz)", department: "Meat & Seafood" },
      { name: "Unsalted Butter", amount: 2, unit: "tbsp", department: "Dairy & Refrigerated" },
      { name: "Garlic Cloves (Minced)", amount: 3, unit: "cloves", department: "Produce" },
      { name: "Fresh Lemon", amount: 1, unit: "sliced", department: "Produce" },
      { name: "Fresh Dill or Parsley", amount: 2, unit: "sprigs", department: "Produce" },
      { name: "Olive Oil", amount: 1, unit: "tbsp", department: "Pantry" }
    ],
    instructions: [
      "Pat salmon fillets thoroughly dry with paper towels. Season generously with salt and black pepper.",
      "Heat olive oil in a stainless steel skillet over medium-high heat until shimmering.",
      "Place salmon skin-side down and sear undisturbed for 4-5 minutes until skin is crispy.",
      "Flip salmon, reduce heat to medium, and add butter, minced garlic, and lemon slices.",
      "Baste the top of the salmon with melted garlic butter for 3-4 minutes until cooked through. Garnish with dill."
    ]
  },
  {
    id: "rec-4",
    title: "Creamy Tuscan Garlic Chicken",
    category: "Dinner",
    diet: ["High-Protein", "Low-Carb"],
    prepTime: 30,
    calories: 610,
    servings: 4,
    image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=800&q=80",
    description: "Tender pan-seared chicken breasts smothered in a rich garlic cream sauce with sun-dried tomatoes and baby spinach.",
    nutrition: { protein: 48, carbs: 9, fat: 42 },
    ingredients: [
      { name: "Chicken Breasts", amount: 2, unit: "large (halved)", department: "Meat & Seafood" },
      { name: "Heavy Cream", amount: 1, unit: "cup", department: "Dairy & Refrigerated" },
      { name: "Baby Spinach", amount: 3, unit: "cups", department: "Produce" },
      { name: "Sun-Dried Tomatoes", amount: 0.5, unit: "cup", department: "Pantry" },
      { name: "Grated Parmesan", amount: 0.5, unit: "cup", department: "Dairy & Refrigerated" },
      { name: "Garlic Cloves", amount: 4, unit: "minced", department: "Produce" }
    ],
    instructions: [
      "Season chicken cutlets with Italian seasoning, garlic powder, salt, and pepper.",
      "Sear chicken in olive oil for 5 minutes per side until golden brown. Transfer to a plate.",
      "In the same pan, saute minced garlic and sun-dried tomatoes for 1 minute.",
      "Pour in heavy cream and chicken broth; bring to a light simmer.",
      "Stir in parmesan cheese and spinach until spinach wilts. Return chicken to pan and spoon sauce over."
    ]
  },
  {
    id: "rec-5",
    title: "Berry Bliss Protein Smoothie Bowl",
    category: "Breakfast",
    diet: ["Vegetarian", "Gluten-Free", "Quick (<20m)"],
    prepTime: 10,
    calories: 340,
    servings: 1,
    image: "https://images.unsplash.com/photo-1590301157890-4810ed352733?auto=format&fit=crop&w=800&q=80",
    description: "Thick and vibrant berry smoothie bowl topped with sliced banana, chia seeds, coconut chips, and toasted granola.",
    nutrition: { protein: 22, carbs: 48, fat: 8 },
    ingredients: [
      { name: "Frozen Mixed Berries", amount: 1.5, unit: "cups", department: "Produce" },
      { name: "Frozen Banana", amount: 1, unit: "medium", department: "Produce" },
      { name: "Greek Yogurt or Almond Milk", amount: 0.5, unit: "cup", department: "Dairy & Refrigerated" },
      { name: "Chia Seeds", amount: 1, unit: "tbsp", department: "Pantry" },
      { name: "Almond Granola", amount: 0.25, unit: "cup", department: "Pantry" }
    ],
    instructions: [
      "Blend frozen berries, banana, and Greek yogurt on high until completely thick and smooth.",
      "Scoop the vibrant smoothie mixture into a wide bowl.",
      "Arrange toppings neatly in lines: sliced fresh fruit, granola, and chia seeds. Enjoy chilled immediately!"
    ]
  },
  {
    id: "rec-6",
    title: "Crispy Chickpea & Kale Caesar Wrap",
    category: "Lunch",
    diet: ["Vegetarian", "Vegan", "High-Fiber"],
    prepTime: 20,
    calories: 410,
    servings: 2,
    image: "https://images.unsplash.com/photo-1509722747041-616f39b57569?auto=format&fit=crop&w=800&q=80",
    description: "Warm whole wheat tortilla filled with massaged Tuscan kale, spiced roasted chickpeas, and tahini-caesar drizzle.",
    nutrition: { protein: 16, carbs: 54, fat: 15 },
    ingredients: [
      { name: "Whole Wheat Tortillas", amount: 2, unit: "large", department: "Pantry" },
      { name: "Canned Chickpeas (Rinsed)", amount: 1, unit: "can (15oz)", department: "Pantry" },
      { name: "Tuscan Kale", amount: 2, unit: "cups (chopped)", department: "Produce" },
      { name: "Tahini", amount: 2, unit: "tbsp", department: "Pantry" },
      { name: "Nutritional Yeast or Parmesan", amount: 2, unit: "tbsp", department: "Pantry" },
      { name: "Smoked Paprika", amount: 0.5, unit: "tsp", department: "Spices & Baking" }
    ],
    instructions: [
      "Toss drained chickpeas with smoked paprika, salt, and olive oil. Pan-roast for 8 minutes until crunchy.",
      "Massage kale with a splash of lemon juice and pinch of salt until dark green and tender.",
      "Whisk tahini, garlic powder, lemon juice, and water to create a creamy dressing.",
      "Warm tortillas in a dry skillet for 30 seconds.",
      "Layer massaged kale, roasted chickpeas, and dressing onto tortillas, fold tightly into burritos, and slice in half."
    ]
  }
];
