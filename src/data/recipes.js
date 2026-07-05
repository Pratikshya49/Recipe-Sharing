// Mock recipe data. In a later module (backend/database weeks) this
// will be replaced by real API calls (fetch/axios) to a Node/Express
// + MongoDB backend. For now it stands in for that data source so the
// frontend can be built and tested independently.
const recipes = [
  {
    id: 1,
    title: "Classic Margherita Pizza",
    image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=600",
    category: "Dinner",
    difficulty: "Medium",
    prepTime: 20,
    cookTime: 15,
    ingredients: ["Pizza dough", "Tomato sauce", "Fresh mozzarella", "Basil leaves", "Olive oil"],
    instructions: "Preheat oven to 250°C. Roll out the dough, spread tomato sauce, add mozzarella, bake for 12-15 minutes, then top with fresh basil and a drizzle of olive oil.",
  },
  {
    id: 2,
    title: "Avocado Toast",
    image: "https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=600",
    category: "Breakfast",
    difficulty: "Easy",
    prepTime: 5,
    cookTime: 5,
    ingredients: ["Sourdough bread", "Avocado", "Lemon juice", "Chilli flakes", "Salt"],
    instructions: "Toast the bread. Mash the avocado with lemon juice and salt, spread on toast, and finish with a pinch of chilli flakes.",
  },
  {
    id: 3,
    title: "Chicken Caesar Salad",
    image: "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=600",
    category: "Lunch",
    difficulty: "Easy",
    prepTime: 15,
    cookTime: 10,
    ingredients: ["Chicken breast", "Romaine lettuce", "Parmesan", "Croutons", "Caesar dressing"],
    instructions: "Grill the chicken and slice it. Toss lettuce, croutons and parmesan with dressing, then top with the chicken.",
  },
  {
    id: 4,
    title: "Chocolate Lava Cake",
    image: "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=600",
    category: "Dessert",
    difficulty: "Hard",
    prepTime: 15,
    cookTime: 12,
    ingredients: ["Dark chocolate", "Butter", "Eggs", "Sugar", "Flour"],
    instructions: "Melt chocolate and butter together. Whisk in eggs and sugar, fold in flour, pour into ramekins and bake at 220°C for 10-12 minutes.",
  },
  {
    id: 5,
    title: "Veggie Spring Rolls",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=600",
    category: "Snacks",
    difficulty: "Medium",
    prepTime: 25,
    cookTime: 10,
    ingredients: ["Rice paper", "Carrot", "Cucumber", "Rice noodles", "Mint leaves"],
    instructions: "Soften rice paper in warm water, fill with vegetables, noodles and mint, roll tightly and serve with dipping sauce.",
  },
  {
    id: 6,
    title: "Overnight Oats",
    image: "https://images.unsplash.com/photo-1517673132405-a56a62b18caf?w=600",
    category: "Breakfast",
    difficulty: "Easy",
    prepTime: 5,
    cookTime: 0,
    ingredients: ["Rolled oats", "Milk", "Chia seeds", "Honey", "Berries"],
    instructions: "Combine oats, milk, chia seeds and honey in a jar. Refrigerate overnight and top with berries before eating.",
  },
];

export default recipes;
