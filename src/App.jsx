import React, { useEffect, useState } from "react";
import useAuthStore from "./components/store/authStore";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Footer from "./components/layout/Footer/Footer";
import Navbar from "./components/layout/Navbar/Navbar";
import Profile from "./pages/Profile";
import Login from "./components/ui/Login/Login";
import SignIn from "./components/ui/Login/SignIn";
import ProductsDisplay from "./pages/ProductsDisplay";
import CreditCardModal from "./components/CreditCardModal"; // ⚠️ Asegúrate de que el nombre del archivo coincida

function App() {
  const loadUserFromStorage = useAuthStore(
    (state) => state.loadUserFromStorage
  );

  useEffect(() => {
    loadUserFromStorage();
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false); // ✅ Definiendo el estado aquí

  return (
    <Router>
      <div className="flex flex-col h-screen">
        <Navbar />
        <div className="flex-grow pt-16">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/profile" element={<Profile />} />
            <Route
              path="/products-by-category/:category"
              element={<ProductsDisplay />}
            />
            <Route
              path="/products/:category"
              element={<h1>Productos por categoría</h1>}
            />
            <Route path="*" element={<h1>Not Found</h1>} />
          </Routes>
        </div>
        <div className="min-h-screen flex flex-col items-center justify-center bg-base-300 text-base-content">
          <button
            className="btn btn-primary"
            onClick={() => setIsModalOpen(true)}
          >
            Abrir Modal
          </button>
          <CreditCardModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
