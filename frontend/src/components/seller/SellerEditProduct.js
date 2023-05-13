import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "../../assets/styles/addproduct.css";
import MainNav from "../MainNav.js";
import Footer from "../Footer.js";


export default function SellerEditProduct() {
  const { id } = useParams();
  const [productId, setId] = useState("");
  const [productName, setName] = useState("");
  const [productPrice, setPrice] = useState("");
  const [productQuantity, setQuantity] = useState("");
  const [productDescrition, setDescrition] = useState("");
  const [sellerId, setUserId] = useState("");
  const [productImage, setImage] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await axios.get(`http://localhost:3005/products/${id}`);
      const data = response.data;
      setId(data.productId);
      setName(data.productName);
      setPrice(data.productPrice);
      setQuantity(data.productQuantity);
      setDescrition(data.productDescription);
      setUserId(data.sellerId);
      setImage(data.productImage);
    };
    fetchProduct();
  }, [id]);

  const updateProduct = async (e) => {
    e.preventDefault();

    let formData = new FormData();
    formData.append("productId", productId);
    formData.append("productName", productName);
    formData.append("productPrice", productPrice);
    formData.append("productQuantity", productQuantity);
    formData.append("productDescription", productDescrition);
    formData.append("sellerId", sellerId);
    formData.append("productImage", productImage);

    axios.put(`http://localhost:3005/products/update/${id}`, formData)
      .then(() => {
        alert("Product updated successfully.");
      })
      .catch((err) => {
        alert(err);
      });
  };

  return (
    <div className="bg">
      <MainNav />
      <br />
      <div className="blogpost-form" style={{ marginTop: '30px' }}>
        <div className="center"><h2>Edit Product</h2></div>
        <form onSubmit={updateProduct}>
          <div className="form-group">
            <label htmlFor="productid">Product Id</label>
            <input type="text" className="form-control" id="productid" required placeholder="Enter Product Id "
              value={productId}
              onChange={(e) => { setId(e.target.value); }}
            />
          </div>
          <div className="form-group">
            <label htmlFor="productname">Product Name</label>
            <input type="text" className="form-control" id="productname" required placeholder={"Enter Product Name "}
              value={productName}
              onChange={(e) => { setName(e.target.value); }}
            />
          </div>
          <div className="form-group">
            <label htmlFor="productprice">Product Price</label>
            <input type="text" className="form-control" id="productprice" required placeholder="Enter Product Price "
              value={productPrice}
              onChange={(e) => { setPrice(e.target.value); }}
            />
          </div>
          <div className="form-group">
            <label htmlFor="productquantity">Quantity</label>
            <input type="text" className="form-control" id="productquantity" required placeholder="Enter Product Quantity "
              value={productQuantity}
              onChange={(e) => { setQuantity(e.target.value); }}
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea className="form-control" id="description" required placeholder="Enter Product Description"
              value={productDescrition}
              onChange={(e) => { setDescrition(e.target.value); }}
            />
          </div>
          <div className="form-group">
            <label htmlFor="image">Image</label>
            <input type="file" className="form-control" id="image" accept="productImage/*"
              onChange={(e) => { setImage(e.target.files[0]); }}
            />
          </div>
          <div className="centerb"><button type="submit" className="btn btn-primary">Update</button></div>
        </form>
      </div>
      <br />
      <Footer />
    </div>
  );
  }  