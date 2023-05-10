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

// Localhost:3005/products/new - POST - Create a new product
//router.post("/new", AdminAuth, upload.single("image"), async (req, res) => {
    router.post("/new", upload.single("image"), async (req, res) => {
        try {
            const { productId, productName, productCategory, productPrice  } = req.body;
            const productImage = req.file ? req.file.path : "";
    
            const product = new Product({ productId, productName, productCategory, productPrice, productImage });
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

// Localhost:3005/products/all - GET - Get all products
router.get("/all", async (req, res) => {
    try {
        const products = await Product.find();
        return res.status(200).json({
            status: true,
            message: "Products retrieved successfully",
            data: products,
        });
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: "Server error",
            data: undefined,
        });
    }
});
module.exports = router;