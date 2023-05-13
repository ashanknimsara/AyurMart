import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../assets/styles/sellerdashboard.css";
import AdminNavbar from "../AdminNavbar"
import Footer from "../Footer.js";


import Swal from "sweetalert2";



const ViewAllProducts = () => {
  const [products, setProducts] = useState([]);
  const [sellerId, setUserId] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      const response = await fetch("http://localhost:5000/auth/Profile", {
        method: "GET",
        credentials: "include",
      });
      if (response.status === 200) {
        const data = await response.json();
        setUserId(data.id);
      } else {
        // Redirect the user to the login page if they are not logged in
        window.location.href = "/login";
      }
    };
    fetchProfile();
  }, []);

  useEffect(() => {
    fetch(`http://localhost:3005/products/all`)
      .then((response) => response.json())
      .then((data) => setProducts(data.data))
      .catch((error) => console.log(error));
  }, []);

  function deleteProduct(id){
    Swal.fire({
        title: 'Are You Sure?',
        text: 'Once deleted, You will not able to recover these details !',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#30085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Delete'

    }).then((res)=>{
        if(res.isConfirmed)
        {axios.delete(`http://localhost:3005/products/delete/${id}`);
        Swal.fire({
            title: 'Success!',
            text: 'Product Deleted Successfully',
            icon: 'success',
            showConfirmButton: false,
            
    });}
}).catch((err)=>{
    Swal.fire({
        title: 'Error!',
        text: "Couldn't delete Product",
        icon: 'error',
    });
});
setTimeout(()=>{
    window.location.replace("http://localhost:3000/seller/dashboard/");
},3000)
}





  return (
    <div>
       
       <AdminNavbar/>
      <div className="product-table">
        <table>
          <thead>
            <tr>
              <th>Product ID</th>
              <th>Product Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Image</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product.productId}</td>
                <td>{product.productName}</td>
                <td>{product.productDescription}</td>
                <td>{product.productPrice}</td>
                <td>{product.productQuantity}</td>
                <td>
                  <img
                    src={`http://localhost:3005/${product.productImage}`}
                    alt={`${product.productName}`}
                  />
                </td>
                <td>
                <button onClick={()=>deleteProduct(product._id)} type="button" className="btndanger">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Footer />
    </div>
  );
};

export default ViewAllProducts;
