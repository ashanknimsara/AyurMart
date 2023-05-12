//public Pages

import Home from "./components/LandingPage";
import ProductPage from "./components/ProductPage"
import ViewProduct from "./components/ViewProduct";
import AddProduct from "./components/seller/SellerAddProduct";

import { BrowserRouter, Routes, Route } from "react-router-dom";


function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<ProductPage />}/>
          <Route path="/products/:id" element={<ViewProduct />}/>
          <Route path="/seller/add-product" element={<AddProduct />}/>
        </Routes>
      </BrowserRouter>
    </div>

  );
}

export default App;
