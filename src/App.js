import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import pages
import Home from "./pages/Home";
import About from "./pages/About";
import SingleProduct from "./pages/SingleProduct";
import ProductNew from "./pages/ProductNew";

import Error from "./pages/Error";
// import components
import Navbar from "./components/Navbar";
import Cart from "./pages/Cart";
import ProductEdit from "./pages/ProductEdit";
function App() {
  return (
    <div>
      <Router >
        <Navbar />
        <Routes>
          <Route index element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/product/:id" element={<SingleProduct />} />
          <Route path="/product/new" element={<ProductNew />} />
          <Route path="/product/:id/edit" element={<ProductEdit />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
