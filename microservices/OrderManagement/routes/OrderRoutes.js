const router = require("express").Router();
const { Customer } = require("../models/CustomerModel");
const { Order } = require("../models/OrderModel");

//Localhost:8070/order/newOrder
router.route("/newOrder").post((req, res) => {
  const {
    shippingInfo,
    orderItems,
    customer,
    totalPrice,
    orderStatus,
    deliveredAt,
    createdAt,
  } = req.body;

  const newOrder = new Order({
    shippingInfo,
    orderItems,
    customer,
    totalPrice,
    orderStatus,
    deliveredAt,
    createdAt,
  });

  newOrder
    .save()
    .then(() => {
      res.json("Order Added Successfully");
    })
    .catch((err) => {
      console.log(err);
    });
});

// retrive all orders

router.route("/").get((req, res) => {
  Order.find()
    .then((Order) => {
      res.json(Order);
    })
    .catch((err) => {
      console.log(err);
    });
});

//update order status
router.route("/updateStatus/:id").put(async (req, res) => {
  const orderId = req.params.id;
  const { orderStatus } = req.body;

  const updateStatus = {
    orderStatus,
  };
  const update = await Order.findByIdAndUpdate(orderId, updateStatus)
    .then(() => {
      res.status(200).send({ status: "Order updated Successfully" });
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .send({ status: "Error with updating data", Order: update });
    });
});

module.exports = router;
