import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import WhatCanICook from "./WhatCanICook";

export default function Navbar({ active: propActive, onChange }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [showAiBar, setShowAiBar] = useState(true);

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
    <header className="sticky top-0 z-50 transition-all duration-300">
      {/* Top AI Recommendation Section */}
      {showAiBar && <WhatCanICook onClose={() => setShowAiBar(false)} />}

      <nav className="backdrop-blur-md bg-white/90 border-b border-orange-100/60 shadow-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3.5">
          <Link to="/" className="flex items-center gap-2 group">
            <span className="text-2xl transition-transform duration-300 group-hover:rotate-12">🍴</span>
            <span className="text-xl font-bold bg-gradient-to-r from-orange-600 to-amber-500 bg-clip-text text-transparent tracking-tight">
              Recipe<span className="text-gray-800">Hub</span>
            </span>
          </Link>
          
          <ul className="flex items-center gap-1 sm:gap-2 text-sm font-medium">
            <li>
              <button
                type="button"
                onClick={() => setShowAiBar((prev) => !prev)}
                className={`relative rounded-lg px-3 py-1.5 font-bold transition-all duration-300 cursor-pointer flex items-center gap-1.5 shadow-sm border ${
                  showAiBar
                    ? 'bg-gradient-to-r from-orange-600 to-amber-500 text-white border-orange-600 shadow-orange-200'
                    : 'bg-amber-50 hover:bg-amber-100 text-orange-700 border-amber-200'
                }`}
              >
                <span>✨ AI Recommend</span>
              </button>
            </li>

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
    </header>
  );
}

