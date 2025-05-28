

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/ecommerce", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  description: String,
});

const Product = mongoose.model("Product", productSchema);

app.get("/",async(req,res)=>{const all = await Product.find();
res.json(all);});
app.post("/register", async (req, res) => {
  const { name, price, description } = req.body;
  try {
    const product = new Product({ name, price, description });
    await product.save();
    res.status(200).send("Product saved");
  } catch (err) {
    res.status(500).send("Failed to save product");
  }
});

app.listen(5000, () => console.log("Server running on http://localhost:5000"));
