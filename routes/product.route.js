const GetProducts = require("../controllers/product.controller");
const Product = require("../models/product.model");
const express = require("express");
const router = express.Router();
router
  .route("/")
  .get(GetProducts)
  .post(async (req, res) => {
    try {
      const newProduct = req.body;
      const createdProduct = await Product.create(newProduct);

      return res.status(200).json(createdProduct);
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  });

module.exports = router;
