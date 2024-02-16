const Product = require("../models/product.model");
const GetProducts = async (req, res, next) => {
  try {
    const AllProducts = await Product.find({});
    return res.status(200).json(AllProducts);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

module.exports = GetProducts;
