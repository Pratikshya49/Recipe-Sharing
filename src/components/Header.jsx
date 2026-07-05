import { Link, NavLink } from "react-router-dom";

// Header component built in Week 1, updated in Week 2 to use
// react-router-dom's <Link>/<NavLink> for client-side navigation
// (no full page reload).
function Header() {
  const linkClass = ({ isActive }) =>
    `ml-6 text-sm font-medium transition-colors ${
      isActive ? "text-white" : "text-orange-100 hover:text-white"
    }`;

  return (
    <header className="bg-orange-700">
      <nav className="max-w-6xl mx-auto flex items-center justify-between px-6 h-16">
        <Link to="/" className="text-2xl font-bold text-white tracking-tight">
           Recipe<span className="text-orange-200">Hub</span>
        </Link>
        <div className="flex items-center">
          <NavLink to="/" end className={linkClass}>
            Discover
          </NavLink>
          <NavLink to="/add" className={linkClass}>
            Add Recipe
          </NavLink>
        </div>
      </nav>
    </header>
  );
}

export default Header;
