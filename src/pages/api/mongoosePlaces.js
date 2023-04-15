
import connectToDatabase from "../../lib/mongooseConn";
import Product from '../../models/places';

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { name, description, price } = req.body;

      await connectToDatabase();

      const product = new Product({
        name,
        description,
        price,
      });

      await product.save();

      res.status(201).json({ message: "Product created successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Unable to create product" });
    }
  } else if (req.method === "GET") {
    try {
      await connectToDatabase();

      const products = await Product.find({});

      res.status(200).json(products);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Unable to retrieve products" });
    }
  } else {
    res.status(400).json({ message: "Invalid request ", method: req.method });
  }
}
