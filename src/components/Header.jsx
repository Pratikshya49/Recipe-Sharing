function Header() {
  return (
    <header className="bg-orange-700">
      <nav className="max-w-6xl mx-auto flex items-center justify-between px-6 h-16">
        <a href="/" className="text-2xl font-bold text-white">🍲 RecipeHub</a>
        <div>
          <a href="#" className="ml-6 text-orange-100 hover:text-white">Discover</a>
          <a href="#" className="ml-6 text-orange-100 hover:text-white">Add Recipe</a>
        </div>
      </nav>
    </header>
  );
}

export default Header;
