import Header from "./components/Header";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar"
import { GlobalValuesProvider } from "./context/GlobalValuesContext";

function App() {
  return (
    <GlobalValuesProvider>
      <div className="relative w-full h-full flex flex-col">
        <div className="fixed inset-0 -z-50 bg-grid-glow" />
        <div className="flex-1 flex flex-col">
          <Header />
          <div className="flex-1 flex flex-row">
            <div className="flex-0 flex flex-col">
              <Sidebar />
            </div>
            <div className="flex-1 flex flex-col">
              <div className="flex-1 flex">
                <Home />
              </div>
              <div className="flex-none">
                <Footer />
              </div>
            </div >
          </div >
        </div >
      </div>
    </GlobalValuesProvider >
  );
}

export default App;
