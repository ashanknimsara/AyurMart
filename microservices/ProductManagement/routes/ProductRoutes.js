const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const Product  = require("../models/ProductModel");

// Configure Multer for storing images
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "media");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});
const upload = multer({ storage });

// Localhost:5000/products/new - POST - Create a new product
//router.post("/new", AdminAuth, upload.single("image"), async (req, res) => {
    router.post("/new", upload.single("image"), async (req, res) => {
        try {
            const { productId, productName, productCategory, productPrice, productImage, productQuantity } = req.body;
            const image = req.file ? req.file.path : "";
    
            const product = new Product({ productId, productName, productCategory, productPrice, productImage, productQuantity, image });
            await product.save();
    
            return res.status(201).json({
                status: true,
                message: "Product created successfully",
                data: product,
            });
        } catch (error) {
            return res.status(500).json({
                status: false,
                message: " error",
                data: undefined,
            });
        }
    });