import Header from "./components/Header";
import Home from "./pages/Home";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      <div className="absolute inset-0 z-0 bg-grid-glow bg-[length:40px_40px] animate-grid-glow" />
      <div className="z-1 w-screen flex flex-col h-5">
        <Header />
        <div className="flex-grow">
          <Home />
        </div>
        <Footer />
      </div >
    </div>
  );
}

export default App;
