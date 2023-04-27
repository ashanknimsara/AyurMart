//when going to cerate order elements are in models file 
 const asyncHandler = require("express-async-handler");
const Order=require("../models/orderModels");

 //when customer place an order it will going to their id 
 const getOrders =asyncHandler(async(req,res)=>{

        const orders = await Order.find({ user: req.user._id });
        res.json(orders);

 });

//place an order 
const createOrder =asyncHandler(
       async(req,res)=>{
              const {title,content,category}=req.body;
       

       if(!title,!content,!category){
              res.status(400)
              throw new Error("please filled out the form ");
}else
{
       const order =new Order({user:  req.user._id,title,content,category});
       const createdOrder =await order.save();
       res.status(201).json(createdOrder);
}
       });


//get order which is in database
const getOrderById =asyncHandler(async(req,res)=>
{
const order = await Order.findById(req.params._id);

if (order) {
  res.json(order);
} else {
  res.status(404).json({ message: "Order not found" });
}
});

//edit the order
const UpdateOrder = asyncHandler(async (req, res) => {
  const { title, content, category } = req.body;

  const order = await Order.findById(req.params._id);

  if (order.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("You can't perform this action");
  }

  if (order) {
    order.title = title;
    order.content = content;
    order.category = category;

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Note not found");
  }
});

const DeleteOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params._id);

  if (order.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("You can't perform this action");
  }

  if (order) {
    await order.remove();
    res.json({ message: " Order Removed" });
  } else {
    res.status(404);
    throw new Error("Order not Found");
  }
});


module.exports = {
   getOrders,
   createOrder,
   getOrderById,
   UpdateOrder,
   DeleteOrder,
 };