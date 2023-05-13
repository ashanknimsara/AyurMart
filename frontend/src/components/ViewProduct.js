import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MainNav from "./MainNav.js";
import Footer from "./Footer.js";
import axios from "axios";
import "../assets/styles/viewproduct.css";

const ViewProduct = () => {
  const [product, setProduct] = useState(null);
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3005/products/${id}`)
      .then((response) => response.json())
      .then((data) => setProduct(data.data))
      .catch((error) => console.log(error));
  }, [id]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "LKR",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price);
  };

  const handleQuantityChange = (event) => {
    setQuantity(parseInt(event.target.value));
  };

  const handleAddToCart = () => {
    let newCartItem = {
      //productId: id,
      productName: product.productName,
      productPrice: product.productPrice,
      productImage: product.productImage,
      quantity: quantity,
      user_Id: "005",
      seller_Id: "003",
      order_Id: "003",
      order_status: "pending"
    };
  
    setCartItems([...cartItems, newCartItem]);
    localStorage.setItem("product_id", id);
    localStorage.setItem("productName", product.productName);
    localStorage.setItem("productImage", product.productImage);
    localStorage.setItem("productPrice", product.productPrice);
    localStorage.setItem("quantity", quantity);
    localStorage.setItem("user_id", "005");
    localStorage.setItem("seller_Id", "003");
    localStorage.setItem("order_Id", "003");
    localStorage.setItem("order_status", "pending");
  
    axios.post(`http://localhost:8070/cart/add`, newCartItem)
      .then(() => {
        alert("Cart Added  Successfully")
      })
      .catch((err) => {
        alert(err)
      });
  };
  
  
  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="view-product-container">
      <MainNav />
      <div className="product-container">
        <div className="product-image-container">
          <img
            src={`http://localhost:3005/${product.productImage}`}
            alt={product.productName}
            className="product-image"
          />
        </div>
        <div className="product-details-container">
          <h1 className="product-name">{product.productName}</h1>
          <p className="product-price">{formatPrice(product.productPrice)}</p>
          <div className="product-quantity-container">
            <label htmlFor="quantity-select" className="quantity-label">
              Select Quantity:
            </label>
            <select
              id="quantity-select"
              onChange={handleQuantityChange}
              value={quantity}
              className="quantity-select"
            >
              {[...Array(10)].map((_, index) => (
                <option key={index} value={index + 1}>
                  {index + 1}
                </option>
              ))}
            </select>
          </div>
          <button onClick={handleAddToCart} className="add-to-cart-button">
            Add to Cart
          </button>
          {product.productQuantity === 0 ? (
            <p className="product-stock-out">Out of stock</p>
          ) : (
            <p className="product-stock-in">In stock</p>
          )}
          <p className="product-description">{product.productDescription}</p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ViewProduct;
