import Header from "./components/Header";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar"
import { GlobalValuesProvider } from "./context/GlobalValuesContext";

function App() {
  return (
    <GlobalValuesProvider>
      <div className="w-screen h-full">
        <div className="fixed inset-0 -z-50 bg-grid-glow" />
        <div className="w-full h-full flex flex-col">
          <Header />
          <div className="w-full h-full flex flex-row">
            <Sidebar />
            <div className="w-full h-full flex flex-col">
              <div className="flex-1 outline outline-red-500">
                <Home />
              </div>
              <div className="flex-1">
                <Footer />
              </div>
            </div >
          </div >
        </div >
      </div>
    </GlobalValuesProvider>
  );
}

export default App;
