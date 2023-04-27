const express =require("express");
const { getOrders, createOrder, getOrderById, UpdateOrder, DeleteOrder } = require("../controllers/orderControllers");
// const protect = require("../middlewares/authMiddleware");
const router =express.Router();



//get all of the order
// router.route("/").get(protect,getOrders);
// //add to the backend (db)
// router.route("/create").post(protect,createOrder);
// // get the order by id (get),update or edit(put) and delete()
// router
//   .route("/:id")
//   .get(getOrderById)
//   .put(protect, UpdateOrder)
//   .delete(protect,DeleteOrder);



module.exports=router;
