import Body from "./components/Body/Body";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";


function App() {
  return (
    <div className="h-screen flex justify-between flex-col pt30 pb-16">
      <Navbar />
      <Body />
      <Footer />

    </div>
  );
}

export default App;
