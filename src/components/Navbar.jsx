import { useNavigate, useLocation, Link } from "react-router-dom";

export default function Navbar({ active: propActive, onChange }) {
  const navigate = useNavigate();
  const location = useLocation();

  const links = [
    { name: 'Browse Recipes', path: '/' },
    { name: 'My Recipes', path: '/my-recipes' },
    { name: 'Add Recipe', path: '/add' }
  ];

  // Determine active tab dynamically from path or fallback to prop
  const getActiveTab = () => {
    if (propActive !== undefined) return propActive;
    const path = location.pathname;
    if (path === '/') return 'Browse Recipes';
    if (path === '/my-recipes') return 'My Recipes';
    if (path === '/add') return 'Add Recipe';
    return '';
  };

  const active = getActiveTab();

  const handleTabClick = (link) => {
    if (onChange) {
      onChange(link.name);
    } else {
      navigate(link.path);
    }
  };

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/80 border-b border-orange-100/50 shadow-sm transition-all duration-300">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-2 group">
          <span className="text-2xl transition-transform duration-300 group-hover:rotate-12">🍳</span>
          <span className="text-xl font-bold bg-gradient-to-r from-orange-600 to-amber-500 bg-clip-text text-transparent tracking-tight">
            Recipe<span className="text-gray-800">Hub</span>
          </span>
        </Link>
        
        <ul className="flex items-center gap-1 sm:gap-2 text-sm font-medium">
          {links.map((link) => (
            <li key={link.name}>
              <button
                type="button"
                onClick={() => handleTabClick(link)}
                className={`relative rounded-lg px-4 py-2 transition-all duration-300 cursor-pointer ${
                  active === link.name
                    ? 'bg-gradient-to-r from-orange-50 to-amber-50 text-orange-700 shadow-sm font-semibold'
                    : 'text-gray-600 hover:text-orange-600 hover:bg-orange-50/50'
                }`}
              >
                {link.name}
                {active === link.name && (
                  <span className="absolute bottom-0 left-1/4 right-1/4 h-0.5 bg-orange-500 rounded-full" />
                )}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
