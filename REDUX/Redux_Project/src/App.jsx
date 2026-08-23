import { Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import HomePage from "./pages/HomePage";
import CollectionPage from "./pages/CollectionPage";
import { ToastContainer } from "react-toastify";

const App = () => {
  return (
    <div className="min-h-screen w-full">
      
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/collection" element={<CollectionPage />} />
      <Route path="*" element={<NotFound />} />
      </Routes>

      <ToastContainer />
    </div>
  );
};

export default App;
