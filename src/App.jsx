import { useState } from 'react'
import Navbar from './components/Navbar'
import RecipeGrid from './components/RecipeGrid'

const sampleRecipes = [
  {
    id: 1,
    title: 'Margherita Pizza',
    cuisine: 'Italian',
    cookTime: '35 min',
    difficulty: 'Medium',
    imageCategory: 'pizza',
  },
  {
    id: 2,
    title: 'Chicken Tikka Masala',
    cuisine: 'Indian',
    cookTime: '50 min',
    difficulty: 'Hard',
    imageCategory: 'butter-chicken',
  },
  {
    id: 3,
    title: 'Avocado Toast',
    cuisine: 'American',
    cookTime: '10 min',
    difficulty: 'Easy',
    imageCategory: 'burger',
  },
  {
    id: 4,
    title: 'Pad Thai',
    cuisine: 'Thai',
    cookTime: '30 min',
    difficulty: 'Medium',
    imageCategory: 'pasta',
  },
  {
    id: 5,
    title: 'Greek Salad',
    cuisine: 'Greek',
    cookTime: '15 min',
    difficulty: 'Easy',
    imageCategory: 'rice',
  },
]

function App() {
  const [activeTab, setActiveTab] = useState('Browse Recipes')

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar active={activeTab} onChange={setActiveTab} />

      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <header className="mb-8">
          <h1 className="text-2xl font-bold text-slate-800">{activeTab}</h1>
          <p className="text-sm text-slate-500">Discover and share your favorite recipes.</p>
        </header>

        <RecipeGrid recipes={sampleRecipes} />
      </div>
    </div>
  )
}

export default App
