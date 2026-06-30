import { useEffect, useState } from 'react'

const difficultyStyles = {
  Easy: 'bg-green-100 text-green-700 ring-1 ring-green-200',
  Medium: 'bg-amber-100 text-amber-700 ring-1 ring-amber-200',
  Hard: 'bg-red-100 text-red-700 ring-1 ring-red-200',
}

export default function RecipeCard({ recipe }) {
  const badgeClass = difficultyStyles[recipe.difficulty] || 'bg-slate-100 text-slate-700 ring-1 ring-slate-200'
  const [imageUrl, setImageUrl] = useState(null)

  useEffect(() => {
    let cancelled = false
    fetch(`https://foodish-api.com/api/images/${recipe.imageCategory}`)
      .then((res) => res.json())
      .then((data) => {
        if (!cancelled) setImageUrl(data.image)
      })
      .catch(() => {})
    return () => {
      cancelled = true
    }
  }, [recipe.imageCategory])

  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      {/* Food image */}
      <div className="h-36 w-full overflow-hidden bg-slate-100">
        {imageUrl ? (
          <img src={imageUrl} alt={recipe.title} className="h-full w-full object-cover" />
        ) : (
          <div className="h-full w-full animate-pulse bg-slate-200" />
        )}
      </div>

      <div className="flex flex-1 flex-col justify-between p-5">
        <div>
          <div className="mb-2 flex items-start justify-between gap-3">
            <h3 className="text-base font-semibold text-slate-800 line-clamp-1">{recipe.title}</h3>
            <span className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ${badgeClass}`}>
              {recipe.difficulty}
            </span>
          </div>
          <p className="text-sm text-slate-500">{recipe.cuisine} cuisine</p>
        </div>

        <div className="mt-4 flex items-center gap-1.5 border-t border-slate-100 pt-3 text-xs text-slate-400">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3.5 w-3.5">
            <circle cx="12" cy="12" r="9" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 7v5l3 3" />
          </svg>
          {recipe.cookTime}
        </div>
      </div>
    </div>
  )
}
