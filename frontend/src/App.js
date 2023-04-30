//public Pages

import Home from "./components/LandingPage";
import ProductPage from "./components/ProductPage"
import AddPayment from "./components/payment/AddPayment";

import { BrowserRouter, Routes, Route } from "react-router-dom";


function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" component={ProductPage} />
          <Route path="/payment-Add" component={AddPayment} />

        </Routes>
      </BrowserRouter>
    </div>

  );
}

export default App;
