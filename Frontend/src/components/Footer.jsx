import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-orange-900 text-orange-100 mt-auto">
      <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-2">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} RecipeHub. Built for coursework — Web Development (Level 5).
        </p>
        <div className="flex gap-4 text-sm">
          <a href="#" className="hover:text-white">About</a>
          <Link to="/contact" className="hover:text-white">Contact</Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
