import Home from "./pages/Home";
import Footer from "./components/layout/Footer/Footer";
import Navbar from "./components/layout/Navbar/Navbar";

function App() {
  return (
    <div className="h-screen flex justify-between flex-col">
      <Navbar />
      <Home />
      <Footer />
    </div>
  );
}

export default App;
