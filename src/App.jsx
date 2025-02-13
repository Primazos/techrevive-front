import React, { useEffect } from "react";
import useAuthStore from "./components/store/authStore";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Footer from "./components/layout/Footer/Footer";
import Navbar from "./components/layout/Navbar/Navbar";
import Profile from "./pages/Profile";
import Login from "./components/ui/Login/Login";
import SignIn from "./components/ui/Login/SignIn";
import ProductsDisplay from "./pages/ProductsDisplay";
import ProductDetails from "./pages/ProductDetails";

function App() {
  const loadUserFromStorage = useAuthStore(
    (state) => state.loadUserFromStorage
  );

  useEffect(() => {
    loadUserFromStorage();
  }, []);

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
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="*" element={<h1>Not Found</h1>} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
