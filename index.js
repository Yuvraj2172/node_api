require("dotenv").config();
const port = 3000;

const express = require("express");
const mongoose = require("mongoose");
const Product = require("./models/product.model");
const app = express();
const productRoute = require("./routes/product.route");

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//routes
app.use("/api/products", productRoute);

app.get("/", (req, res) => {
  res.status(200).send("Welcome");
});

app.get("/api/products/:id", async (req, res) => {
  const __id = req.params.id;
  console.log(__id);
  try {
    const prod = await Product.find({ _id: __id });
    console.log(prod);
    res.status(200).json(prod);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
  
});

//update a product

app.put("/api/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const newProd = await Product.findByIdAndUpdate(id, req.body);
    if (!newProd) {
      return res.status(404).json({ msg: "Product not found" });
    }
    const updatedProd = await Product.findById(id);
    res.status(200).json(updatedProd);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

app.delete("/api/products/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const prod = await Product.findByIdAndDelete(id);
    if (!prod) {
      return res.status(404).json({ msg: "Product not found" });
    }
    return res.status(200).json({
      msg: "deleted successfully",
      prod,
    });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected");
  })
  .catch(() => {
    console.log("Connection Failed");
  });

app.listen(port, () => {
  console.log(`listening on ${port}`);
});
