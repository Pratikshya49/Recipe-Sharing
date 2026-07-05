// Mock recipe data representing 5 initial sample recipes.
const recipes = [
  {
    id: 1,
    title: "Classic Margherita Pizza",
    image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=600",
    category: "Dinner",
    cuisine: "Italian",
    difficulty: "Medium",
    cookTime: 15,
    ingredients: ["Pizza dough", "Tomato sauce", "Fresh mozzarella", "Basil leaves", "Olive oil"],
    steps: [
      "Preheat the oven to 250°C (480°F).",
      "Roll out the pizza dough on a floured surface to your desired thickness.",
      "Spread an even layer of tomato sauce over the dough.",
      "Tear fresh mozzarella cheese and distribute it evenly across the pizza.",
      "Bake for 12-15 minutes until the crust is golden and cheese is bubbly.",
      "Remove from oven, top with fresh basil leaves, and drizzle with olive oil."
    ],
  },
  {
    id: 2,
    title: "Avocado Toast",
    image: "https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?w=600",
    category: "Breakfast",
    cuisine: "American",
    difficulty: "Easy",
    cookTime: 5,
    ingredients: ["Sourdough bread", "Avocado", "Lemon juice", "Chilli flakes", "Salt"],
    steps: [
      "Toast the slices of sourdough bread to a golden crisp.",
      "Cut and scoop out the flesh of a ripe avocado into a bowl.",
      "Mash the avocado with lemon juice and a pinch of salt.",
      "Spread the mashed avocado evenly onto the toasted bread.",
      "Sprinkle a pinch of chilli flakes on top and serve immediately."
    ],
  },
  {
    id: 3,
    title: "Chicken Caesar Salad",
    image: "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=600",
    category: "Lunch",
    cuisine: "American",
    difficulty: "Easy",
    cookTime: 10,
    ingredients: ["Chicken breast", "Romaine lettuce", "Parmesan", "Croutons", "Caesar dressing"],
    steps: [
      "Season the chicken breast and grill it for 5-6 minutes on each side until fully cooked.",
      "Let the chicken rest, then slice it into thin strips.",
      "Chop romaine lettuce and place it in a large serving bowl.",
      "Toss the lettuce with Caesar dressing, croutons, and grated parmesan cheese.",
      "Top the salad with the sliced chicken strips and extra parmesan."
    ],
  },
  {
    id: 4,
    title: "Chocolate Lava Cake",
    image: "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=600",
    category: "Dessert",
    cuisine: "French",
    difficulty: "Hard",
    cookTime: 12,
    ingredients: ["Dark chocolate", "Butter", "Eggs", "Sugar", "Flour"],
    steps: [
      "Preheat your oven to 220°C (428°F) and grease the ramekins.",
      "Melt the dark chocolate and butter together in a heatproof bowl.",
      "In another bowl, whisk the eggs and sugar together until pale and thick.",
      "Fold the melted chocolate mixture and flour gently into the whisked eggs.",
      "Pour the batter into ramekins and bake for 10-12 minutes.",
      "Let it cool for 1 minute, invert onto a plate, and serve warm with vanilla ice cream."
    ],
  },
  {
    id: 5,
    title: "Veggie Spring Rolls",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=600",
    category: "Snacks",
    cuisine: "Asian",
    difficulty: "Medium",
    cookTime: 10,
    ingredients: ["Rice paper", "Carrot", "Cucumber", "Rice noodles", "Mint leaves"],
    steps: [
      "Soften a sheet of rice paper in a bowl of warm water for a few seconds.",
      "Lay the wrapper flat and place a small portion of noodles, julienned carrots, and cucumbers in the center.",
      "Add fresh mint leaves for aroma.",
      "Fold the sides of the wrapper inward and roll it up tightly.",
      "Repeat for the rest of the wrappers and serve fresh with peanut dipping sauce."
    ],
  },
];

export default recipes;
