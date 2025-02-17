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


function App() {
  const loadUserFromStorage = useAuthStore(
    (state) => state.loadUserFromStorage
  );

  useEffect(() => {
    loadUserFromStorage();
  }, []);

 
  const userId = "256f0f4a-aa2b-4740-94ae-9dfa9feea648"; // Ejemplo de user_id

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

        <Footer />
      </div>
    </Router>
  );
}

export default App;