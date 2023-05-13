const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const { Customer } = require("../models/CustomerModel");
const { CustomerToken } = require("../models/CustomerToken");
const { CustomerAUth } = require("../middlewares/CustomerAuth");
const jwt = require("jsonwebtoken");

//Localhost:8070/customer/register  ---> registration

http: router.post("/register", (req, res) => {
  Customer.find({ email: req.body.email })
    .exec()
    .then((customer) => {
      if (customer.length >= 1) {
        return res.status(401).json({
          status: false,
          message: "Email exists",
          data: undefined,
        });
      } else {
        bcrypt.hash(req.body.password, 2, (err, hash) => {
          if (err) {
            return res.status(500).json({
              status: false,
              message: "Error, cannot encrypt password",
              data: undefined,
            });
          } else {
            const customer = new Customer({ ...req.body, password: hash });
            customer.save((err, doc) => {
              if (err)
                return res.json({
                  status: false,
                  message: err,
                  data: undefined,
                });

              return res.status(200).json({
                status: true,
                message: "Register Successfully",
                data: doc,
              });
            });
          }
        });
      }
    });
});

//Localhost:8070/customer/login -----> customer login

http: router.post("/login", (req, res) => {
  Customer.findOne({ email: req.body.email })
    .exec()
    .then((customer) => {
      if (!customer) {
        return res.status(401).json({
          message: "User not found",
          status: false,
          data: undefined,
        });
      }

      bcrypt.compare(
        req.body.password,
        customer.password,
        async (err, result) => {
          if (err) {
            return res.status(401).json({
              status: false,
              message: "Server Error, authrntication failded",
              data: undefined,
            });
          }

          if (result) {
            const token = jwt.sign(
              {
                email: customer.email,
                customerId: customer._id,
              },

              process.env.JWT_KEY,
              {
                expiresIn: "2h",
              },
            );

            await CustomerToken.findOneAndUpdate(
              { _customerId: Customer._id, tokenType: "login" },
              { token: token },
              { new: true, upsert: true },
            );
            return res.status(200).json({
              status: true,
              message: "Login Successfully...",

              data: {
                token,
                customer,
              },
            });
          }
          return res.status(401).json({
            status: true,
            message: "Wrong Password ! ",
            data: undefined,
          });
        },
      );
    })
    .catch((err) => {
      res.status(500).json({
        status: false,
        message: "Server Error, authrntication failed....",
        data: undefined,
      });
    });
});

//Localhost:8070/customer/logout ----> customer logout

http: router.get("/logout", CustomerAUth, (req, res) => {
  CustomerToken.findOneAndDelete(
    { _customerId: req.customerId, tokenType: "login" },
    (err, doc) => {
      if (err)
        return res.status(401).json({
          status: false,
          message: "Server error, logout failed",
        });

      return res.status(200).json({
        status: true,
        message: "Logout successfully",
      });
    },
  );
});

//localhost:8070/customer/  -----> retrieve

http: router.route("/").get((req, res) => {
  Customer.find()
    .then((customer) => {
      res.json(customer);
    })
    .catch((err) => {
      console.log(err);
    });
});

//localhost:8070/customer/delete/   -----> delete

http: router.route("/delete/:id").delete(async (req, res) => {
  let userID = req.params.id;

  await Customer.findByIdAndDelete(userID)

    .then(() => {
      res.status(200).send({ status: "User syccessfully Deleted" });
    })
    .catch((err) => {
      console.log(err.message);
      res
        .status(500)
        .send({ status: "Error with deleting user", error: err.message });
    });
});

//localhost:8070/customer/update/  ------> update user role

http: router.route("/update/:id").put(async (req, res) => {
  let userID = req.params.id;
  //destructure
  const { name, email, permissionLevel } = req.body;

  const updateCustomer = {
    name,
    email,
    permissionLevel,
  };

  const update = await Customer.findByIdAndUpdate(userID, updateCustomer)
    .then(() => {
      res.status(200).send({ status: "Customer Details Updated" });
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .send({ status: "Error with updating data!", error: err.message });
    });
});

//localhost:8070/customer/get/  -----> profile

router.route("/get/:id").get(async (req, res) => {
  let userID = req.params.id;
  const user = await Customer.findById(userID)
    .then((customer) => {
      res.status(200).send({ status: "User fetched", customer });
    })
    .catch(() => {
      console.log(err.message);
      res
        .status(500)
        .send({ status: "Error with get user", error: err.message });
    });
});

module.exports = router;
