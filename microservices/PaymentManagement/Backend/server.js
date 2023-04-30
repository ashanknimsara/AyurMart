const express=require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const cors = require("cors");
const dotenv=require("dotenv");
const notes = require("./data/notes");
const connectDB = require("./config/db");




const app  =express();
dotenv.config();
connectDB();
app.use(express.json());

app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

app.use('/uploads', express.static('backend/uploads'));

//routes
const paymentRouter = require("./routes/payments.js");
app.use("/payment",paymentRouter);


//app.use('/user', user);
// app.use(notFound);
// app.use(errorHandler);

const PORT=process.env.PORT  || 5000;


app.listen(5000,console.log(`server started on port ${PORT}`));