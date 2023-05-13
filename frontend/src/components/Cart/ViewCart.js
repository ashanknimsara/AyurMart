import React, { useState, useEffect } from "react";
import axios from "axios";
import './Cart.css';
import MainNav from "../MainNav";

const ViewCart = () => {
  const [allCart, setAllCart] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    //const userId = localStorage.getItem("userId");
    axios
      .get("http://Localhost:8070/cart/")
      .then((res) => setAllCart(res.data));
  });

  function decrementCount(id) {
    const exist = allCart.find((cart) => cart._id === id);

    if (exist) {
      var quantity = exist.quantity - 1;
      if (quantity < 1) {
        quantity = 1;
        alert("Cannot decrement the quantity");
      }

      const newQty = {
        quantity: quantity,
      };
      axios.put(`http://localhost:8070/cart/update/${id}`, newQty);
    }
  }

  function incrementCount(id) {
    const exist = allCart.find((cart) => cart._id === id);

    if (exist) {
      var quantity = exist.quantity + 1;
      const newQty = {
        quantity: quantity,
      };

      axios.put(`http://localhost:8070/cart/update/${id}`, newQty);
    }
  }

  const deleteCart = (id) => {
    axios
      .delete(`http://localhost:8070/cart/delete/${id}`)
      .then((res) => alert("Item removed"));

    setAllCart(allCart.filter((elem) => elem.id !== id));
  };

const handleClick = (id) => {
  axios.delete(`http://localhost:8070/cart/get/${id}`);
  window.location.replace("http://localhost:3000/add-review");
};

  return (
   
    <div class='container'> 
    <MainNav />     
    <br></br><br></br>  

      <div className="row1">        
        <div className="col1"></div>
        <div className="col10">
        <div className="row">          
        <h1 className="text-start">Shopping Cart</h1>
      </div><div className="row1">
        <div className="col-lg-9 col-0"></div>
        <div className="col-lg-3 col-2">
          <form className="form-inline responsive">
          <div class="input-group">
            <input type="search" class="form-control" placeholder="Search"
              aria-label="Search"
              onChange={(event)=> {
                setSearchTerm(event.target.value)
              }}/>            
              <button className="btn btn-success my-2 my-sm-0" type="submit">
              Search
              </button>
            
          </div>       
          </form>
        </div>
      </div>

          <table className="table table-hover text-center responsive">            
          <thead className="thead-light">

              <tr>
                <th>Item</th>
                <th></th>
                <th>Unit Price</th>
                <th>Quantity</th>


                <th>Subtotal</th>
                <th></th>
              </tr>
            </thead>

            {allCart.map((cart, key) => (
              <tbody>
                
            </tbody>
            
            ))},{allCart.filter((val)=> {
              if(searchTerm == "") {
                return val
            } else {
                const userId = val.user_Id || "005"
                if(userId.toLowerCase().includes(searchTerm.toLowerCase())) {
                    return val
                } else if(val.productName.toLowerCase().includes(searchTerm.toLowerCase())) {
                    return val
                }
            }
              }).map((cart, key) => (              
              <tbody>
                <tr>
                  {/* <td>{cart.productImage}</td> */}
                  <td>{cart.productName}</td>                  

                  <td>Rs.{cart.productPrice}</td>
                  <td>
                    <button
                      className="btn btn-info-outline"
                      onClick={() => decrementCount(cart._id)}>
                      -
                    </button>
                    {/*Decrement*/}
                    <label
                      className="text-center fs-6"
                      name="qty"
                      style={{ width: 30, height: 30 }}
                      value={cart.quantity}>
                      {cart.quantity}
                    </label>
                    <button
                      className="btn btn-info-outline"
                      onClick={() => incrementCount(cart._id)}>
                      +
                    </button>
                    {/*Decrement*/}
                  </td>

                  <td>Rs.{cart.productPrice * cart.quantity}</td>
                  <td>
                    <button
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => deleteCart(cart._id)}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        class="bi bi-trash"
                        viewBox="0 0 16 16">
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                        <path
                          fill-rule="evenodd"
                          d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                        />
                      </svg>
                    </button>

                  </td>

                    </tr>
                    <tr>

                    <td> 
                      <button className="btn btn-outline-info btn-sm"
                      onClick={() => handleClick(cart.productName)}>Add feedback</button></td>

                </tr>
              </tbody>
            ))}
          </table>
        </div>
        <div className="col-md-1"></div>
      </div>

      <div className="row">
        <div className="col-md-1"></div>
        <div className="col-md-10">
          <button
            className="btn btn-primary  mb-2 rounded-pill px-4"
            onClick={() => {
              window.location.href = "/shop";
            }}>
            Continue Shopping
          </button>

          <div className="col-md-10"> <button
            className="btn btn-outline-warning  mb-2 rounded-pill px-4"
            onClick={() => {window.location.href = "/AddDelivary";}}>
            Next 
          </button></div>
      </div>
      </div>
      </div>
     
  );
};

export default ViewCart;
