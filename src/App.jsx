import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import AddRecipePage from "./pages/AddRecipePage";
import RecipeDetail from "./pages/RecipeDetail";
import { RecipeProvider } from "./context/RecipeContext";

function App() {
  return (
    <RecipeProvider>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col bg-orange-50/40">
          <Header />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
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
