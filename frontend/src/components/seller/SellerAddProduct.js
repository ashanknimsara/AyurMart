import React, { useState } from "react";
import axios from "axios";
import "../../assets/styles/addproduct.css";
import MainNav from "../MainNav.js";
import Footer from "../Footer.js"


export default function SellerAddProduct() {

    const [productId, setId] = useState("");
    const [productName, setName] = useState("");
    const [productPrice, setPrice] = useState("");
    const [productQuantity, setQuantity] = useState("");
    const [productDescrition, setDescrition] = useState("");
    const [sellerId] = useState("644b8acb303285e572b3f045");
    const [productImage, setImage] = useState("");




    const sendData = async (e) => {
        

        let formData = new FormData();
        formData.append("productId", productId);
        formData.append("productName", productName);
        formData.append("productPrice", productPrice);
        formData.append("productQuantity", productQuantity);
        formData.append("productDescription", productDescrition);
        formData.append("sellerId", sellerId);
        formData.append("productImage", productImage);

        axios.post("http://localhost:3005/products/new", formData).then(() => {
            alert("Product Added Successfully")


        }).catch((err) => {
            alert(err)
        })

    }

    return (

        <div className="bg">

            <MainNav />
            <br />

            <div className="blogpost-form" style={{ marginTop: '30px' }}>
                <div class="center"><h2>Add New Product</h2></div>
                <form onSubmit={sendData}>
                    <div className="form-group">
                        <label for="name">Product Id</label>
                        <input type="text" className="form-control" id="productid" required placeholder="Enter Product Id "
                            onChange={(e) => { setId(e.target.value); }}
                        />
                    </div>
                    <div className="form-group">
                        <label for="name">Product Name</label>
                        <input type="text" className="form-control" id="productname" required placeholder="Enter Product Name "
                            onChange={(e) => { setName(e.target.value); }}
                        />
                    </div>
                    <div className="form-group">
                        <label for="name">Product Price</label>
                        <input type="text" className="form-control" id="producprice" required placeholder="Enter Product Price "
                            onChange={(e) => { setPrice(e.target.value); }}
                        />
                    </div>
                    <div className="form-group">
                        <label for="name">Quantity</label>
                        <input type="text" className="form-control" id="productquantity" required placeholder="Enter Product Quantity "
                            onChange={(e) => { setQuantity(e.target.value); }}
                        />
                    </div>
                    <div className="form-group">
                        <label for="location">Description</label>
                        <textarea className="form-control" id="description" required placeholder="Enter Product Description"
                            onChange={(e) => { setDescrition(e.target.value); }}
                        />

                    </div>

                    <div className="form-group">
                        <label for="image">Image</label>
                        <input type="file" className="form-control" id="image" accept="productImage/*"
                            onChange={(e) => { setImage(e.target.files[0]); }}
                        />
                    </div>

                    <div class="centerb"><button type="submit" className="btn btn-primary">Submit</button></div>
                </form>
            </div>
            <br />
            <Footer />
        </div>
    )
}
