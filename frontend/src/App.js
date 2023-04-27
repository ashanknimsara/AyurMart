//public Pages

import Home from "./components/LandingPage";
import ProductPage from "./components/ProductPage"

import { BrowserRouter, Routes, Route } from "react-router-dom";


function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" component={ProductPage} />

        </Routes>
      </BrowserRouter>
    </div>

  );
}

export default App;
