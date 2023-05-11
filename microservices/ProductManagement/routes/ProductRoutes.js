const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const Product  = require("../models/ProductModel");
const serveStatic = require("serve-static");

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
    router.post("/new", upload.single("productImage"), async (req, res) => {
        try {
            const { productId, productName, productCategory, productPrice, productQuantity  } = req.body;
            const productImage = req.file ? req.file.path : "";
    
            const product = new Product({ productId, productName, productCategory, productPrice, productQuantity, productImage });
            await product.save();
    
            return res.status(201).json({
                status: true,
                message: `Product |${product.productName}| created successfully`,
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

// Localhost:3005/products/:id - GET - Get a specific article
router.get("/:id", async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product)
            return res.status(404).json({ status: false, message: "Not found" });

        return res.status(200).json({
            status: true,
            message: `Product |${product.productName}| retrieved successfully`,
            data: product,
        });
    } catch (error) {
        return res.status(500).json({
            status: false,
            message: "Server error",
            data: undefined,
        });
    }
});

// localhost:3005/products/update/:id - PUT - Update an existing article
//router.put("/update/:id", AdminAuth, upload.single("image"), async (req, res) => {
    router.put("/update/:id", upload.single("productImage"), async (req, res) => {
        try {
            const { productId, productName, productCategory, productPrice, productQuantity } = req.body;
            const productImage = req.file ? req.file.path : "";
    
            const product = await Product.findById(req.params.id);
            if (!product)
                return res.status(404).json({ status: false, message: "Not found" });
    
            // Delete the old image file if it's different from the new one
            if (productImage && productImage !== product.productImage) {
                fs.unlinkSync(product.productImage);
            }
    
            product.productId = productId;
            product.productName = productName;
            product.productCategory = productCategory;
            product.productPrice = productPrice;
            product.productQuantity = productQuantity;
            product.productImage = productImage || product.productImage;
    
            const updatedProduct = await product.save();
            return res.status(200).json({
                status: true,
                message: `product |${product.productName}| updated successfully`,
                product: updatedProduct,
            });
        } catch (err) {
            return res.status(500).json({ status: false, message: err.message });
        }
    });

    // localhost:3005/products/delete/:id - DELETE - Delete an existing product
//router.delete("/delete/:id", AdminAuth, async (req, res) => {
    router.delete("/delete/:id", async (req, res) => {    
        try {
            const product = await Product.findById(req.params.id);
            if (!product)
                return res.status(404).json({ status: false, message: "Not found" });
    
            // Remove the associated image file from the media folder
            if (product.productImage) {
                fs.unlinkSync(path.join(__dirname, `../${product.productImage}`));
            }
    
            await Product.findByIdAndDelete(req.params.id);
    
            return res
                .status(200)
                .json({ status: true, message: `Product |${product.productName}| deleted successfully` });
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                status: false,
                message: "Server error, article deletion failed",
            });
        }
    });

module.exports = router;