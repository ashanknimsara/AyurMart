const express = require("express"); //Express web server framework
const mongoose = require("mongoose"); //MongoDB
const bodyParser = require("body-parser"); //Parses the request body to be a readable json format
const cors = require("cors"); //Cross origin resource sharing
const dotenv = require("dotenv"); //Loads environment variables from a .env file into process.env
const app = express(); //Initialize the Express application
const path = require("path")
require("dotenv").config(); //Loads environment variables from a .env file into process.env

const PORT = process.env.PORT || 8070;

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));//*
app.use(bodyParser.urlencoded({ extended: false }));//*
app.use(bodyParser.json());

const URL = process.env.MONGODB_URL; // mongoDB URL

mongoose.connect(URL, {});

const connection = mongoose.connection; //mongoDB connection
connection.once("open", () => {
  console.log("MongoDB Database Connection Successfull"); //Display in console if
});

const CustomerRouter = require("./routes/CustomerRoutes.js");
app.use("/customer", CustomerRouter);

const OrderRouter = require("./routes/OrderRoutes"); //imort order route from routes
app.use("/order", OrderRouter); //order route

const CartRouter = require("./routes/CartRoutes.js");
app.use("/cart", CartRouter);

const WishlistRouter = require("./routes/WishlistRoutes.js");
app.use("/wishlist", WishlistRouter);

const ReviewRouter = require("./routes/ReviewRoutes.js");
app.use("/review", ReviewRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port number : ${PORT}`); //Display in console if server is running
});
