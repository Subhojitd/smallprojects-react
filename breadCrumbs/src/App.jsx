import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ProductsListing from "./pages/ProductsListing";
import ProductDetails from "./pages/ProductDetails";
import BreadCrubms from "./components/BreadCrubms";

function App() {
  return (
    <BrowserRouter>
      <div className="w-full h-full bg-black text-white flex items-center  flex-col  gap-5">
        <div className=" text-white h-full flex items-start  flex-col p-5 gap-2 border-l-2 border-r-2 ">
          <h1 className="text-3xl w-full border-b-2 text-center">
            Shop It Now 🛒
          </h1>
          {/* BreadCrumbs */}
          <BreadCrubms />
          {/* Routes */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<ProductsListing />} />
            <Route path="/products/:id" element={<ProductDetails />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
