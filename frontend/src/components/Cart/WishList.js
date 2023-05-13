import React, { useState, useEffect } from "react";
import axios from "axios";

const WishList = () => {
  const [allWishList, setAllWishList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios
      .get("http://Localhost:8070/wishlist/")
      .then((res) => setAllWishList(res.data));
  }, []);

  const remove = (id) => {
    axios
      .delete(`http://localhost:8070/wishlist/delete/${id}`)
      .then((res) => alert("Item removed"));

    setAllWishList(allWishList.filter((elem) => elem._id !== id));
  };

  return (
    <div className="responsive">
      <br />
      <br />
      <div className="row">
        <div className="col-md-1"></div>
        <div className="col-md-10">
          <div className="row">
            <h1 className="text-start">Favourites</h1>
          </div>
          <div className="row">
            <div className="col-lg-9 col-0"></div>
            <div className="col-lg-3 col-2">
              <form className="form-inline responsive">
                <div className="input-group">
                  <input
                    type="search"
                    className="form-control"
                    placeholder="Search"
                    aria-label="Search"
                    onChange={(event) => {
                      setSearchTerm(event.target.value);
                    }}
                  />
                  <button
                    className="btn btn-success my-2 my-sm-0"
                    type="submit"
                  >
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
                <th></th>
              </tr>
            </thead>

            <tbody>
              {allWishList
                .filter((val) => {
                  if (searchTerm === "") {
                    return val;
                  } else if (
                    val.productName
                      .toLowerCase()
                      .includes(searchTerm.toLowerCase())
                  ) {
                    return val;
                  }
                  return false;
                })
                .map((wishlist, key) => (
                  <tr key={key}>
                    <td>{wishlist.productImage}</td>
                    <td>{wishlist.productName}</td>
                    <td>Rs.{wishlist.productPrice}</td>
                    <td>
                      <button
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => remove(wishlist._id)}
                        
                      >
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
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
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
              window.location.href = "/";
            }}
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default WishList;
