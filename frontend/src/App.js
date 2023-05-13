//public Pages

import Home from "./components/LandingPage";
import ProductPage from "./components/ProductPage"

import ViewProduct from "./components/ViewProduct";
import AddProduct from "./components/seller/SellerAddProduct";
import SellerDashboard from "./components/seller/SellerDashboard";
import UpdateProduct from "./components/seller/SellerEditProduct";

import Signup from "./components/logger/Signup/Signup"
import Login from "./components/logger/Login/Login";
import Profile from "./components/logger/Profile/Profile";
import EditProfile from "./components/logger/Profile/EditProfile";
import ViewSellers from "./components/admin/ViewSellers";
import ViewAllProducts from "./components/admin/ViewAllProducts";
import AdminDashboard from "./components/admin/AdminDashboard";


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
          <Route path="/seller/update-product" element={<UpdateProduct />}/>
          <Route path="/seller/dashboard" element={<SellerDashboard />}/>

          <Route path="/Signup" element={<Signup />}/>
          <Route path="/Login" element={<Login />}/>
          <Route path="/profile" element={<Profile />}/>
          <Route path="/edit-profile" element={<EditProfile />}/>
          <Route path="/viewSellers" element={<ViewSellers />}/>
          <Route path="/viewAllProducts" element={<ViewAllProducts />}/>
          <Route path="/admin" element={<AdminDashboard />}/>
        </Routes>
      </BrowserRouter>
    </div>

  );
}

export default App;
