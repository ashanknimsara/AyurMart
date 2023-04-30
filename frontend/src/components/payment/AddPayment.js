import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

import axios from "axios";

const AddPayment = () => {
  const [card_name, setCardName] = useState("");
  const [card_number, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setcvv] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [amount, setAmount] = useState("");
  const [IDOrder, setIddOrder] = useState("");
  const [payID, setPayId] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
   
   axios.post("http://localhost:5003/api/user/save", {
        name: name,
        email: email,
        mobileNumber: mobileNumber,
        id: id,
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <Header />
      <div className="register-form">
        <h2 style={{ margin: "20px" }}>Register</h2>
        <Form onSubmit={handleSubmit} style={{ margin: "20px" }}>
          <Form.Group controlId="formName">
            <Form.Label>card_name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter card Name"
              value={card_name}
              onChange={(e) => setCardName(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formEmail">
            <Form.Label>card_number</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter card Number"
              value={card_number}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formMobileNumber">
            <Form.Label>expiry</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter expiry date"
              value={expiry}
              onChange={(e) => setMobileNumber(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formId">
            <Form.Label>cvv</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter cvv"
              value={cvv}
              onChange={(e) => setId(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formId">
            <Form.Label>street</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter street"
              value={street}
              onChange={(e) => setId(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formId">
            <Form.Label>city</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter city"
              value={city}
              onChange={(e) => setId(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formId">
            <Form.Label>state</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter state"
              value={state}
              onChange={(e) => setId(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formId">
            <Form.Label>zip</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter zip"
              value={zip}
              onChange={(e) => setId(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formId">
            <Form.Label>amount</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setId(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formId">
            <Form.Label>IDOrder</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter IDOrder"
              value={IDOrder}
              onChange={(e) => setId(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formId">
            <Form.Label>payID</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter payID"
              value={payID}
              onChange={(e) => setId(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            submit
          </Button>
        </Form>
      </div>
      <Footer />
    </div>
  );
};

export default AddPayment ;