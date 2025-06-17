import Header from "./components/Header";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar"

function App() {
  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      <div className="absolute inset-0 z-0 bg-grid-glow bg-[length:40px_40px] animate-grid-glow" />
      <div className="z-10 w-screen flex flex-col-2 h-5">
        <div className="h-screen">
          <Sidebar />
        </div>
        <div>
          <Header />
          <div className="flex-grow">
            <Home />
          </div>
          <Footer />
        </div >
      </div >
    </div>
  );
}

export default App;
