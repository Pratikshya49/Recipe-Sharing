export default function Navbar({ active, onChange }) {
  const links = ['Browse Recipes', 'My Recipes', 'Add Recipe']

  return (
    <nav className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <span className="text-lg font-bold text-orange-600">🍳 Recipe Sharing</span>
        <ul className="flex items-center gap-1 text-sm font-medium">
          {links.map((link) => (
            <li key={link}>
              <button
                type="button"
                onClick={() => onChange(link)}
                className={`rounded-lg px-3 py-2 transition ${
                  active === link
                    ? 'bg-orange-100 text-orange-700'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                {link}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
