import Header from './components/sections/Header';
import Home from './pages/Home';
import Footer from './components/sections/Footer';
import Sidebar from './components/sections/Sidebar';
import { AdjustableValuesProvider } from './context/AdjustableValuesContext';
import ListingParser from './components/sections/ListingParser';

function App() {
  return (
    <AdjustableValuesProvider>
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
                <ListingParser />
              </div>
              <div className="flex-none">
                <Footer />
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdjustableValuesProvider>
  );
}

export default App;
