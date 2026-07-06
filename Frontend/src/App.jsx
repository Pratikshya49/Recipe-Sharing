import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import AddRecipePage from "./pages/AddRecipePage";
import RecipeDetail from "./pages/RecipeDetail";
import MyRecipes from "./pages/MyRecipes";
import { RecipeProvider } from "./context/RecipeContext";

function App() {
  return (
    <RecipeProvider>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col bg-orange-50/40">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/my-recipes" element={<MyRecipes />} />
              <Route path="/add" element={<AddRecipePage />} />
              <Route path="/recipe/:id" element={<RecipeDetail />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </RecipeProvider>
  );
}

export default App;
