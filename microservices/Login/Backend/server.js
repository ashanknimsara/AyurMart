const express=require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const cors = require("cors");
const dotenv=require("dotenv");
const connectDB = require("./config/db");
const sellerRoutes =require('./routes/sellerLoginRoutes');
const { notFound, errorHandler } = require("./middlewares/errorMiddleware");


const app  =express();
dotenv.config();
connectDB();
app.use(express.json());

app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

app.use('/uploads', express.static('backend/uploads'));

app.use('/api/sellers',sellerRoutes);

//app.use('/user', user);
app.use(notFound);
app.use(errorHandler);

const PORT=process.env.PORT  || 5000;


app.listen(5000,console.log(`server started on port ${PORT}`));