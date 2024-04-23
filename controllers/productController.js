import productModel from "../models/productModel.js";



const productController = {
  // Create a new product
  createProduct: async (req, res) => {
    try {
        const products = await productModel.create(req.body);
      
        res.status(201)
        .json({ message: "product created", Product: products });
    } catch (error) {
        console.log(error)
      res.status(500).json({ message: error.message });
    }
  },

  // Get all products
  getAllProducts: async (req, res) => {
    try {
      const products = await productModel.find();
      res.status(200).json({message:'list of products',Products:products});
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Get a single product by ID
  getProductById: async (req, res) => {
    try {
      const product = await productModel.findById(req.params.id);
      if (!product) {
        return res.status(404).json({ message: 'Product not found with given Id' });
      }
      res.status(200).json(product);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // Update a product by ID
  updateProduct:  (req, res) => {
    
    
    productModel.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((updateProduct) => {
      if (!updateProduct) {
          return res
              .status(404)
              .json({ msg: 'No product with this id was found.' });
      }
      res.json({ updateProduct });
  })
  .catch((err) => {
      res.status(400).send(err);
  });

},

  // Delete a product by ID
  deleteProduct: async (req, res) => {
    productModel.findByIdAndDelete
    (req.params.id)
    .then(() => {
        res.status(204).json({ msg: `product deleted` });
    }).catch((err) => {
        res.status(404).send("product not found`");
    })
  }
};

export default productController;