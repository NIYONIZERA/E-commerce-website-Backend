import express from "express"
const productRoute=express.Router();
import productController from "../controllers/productController.js";

productRoute.post("/create",productController.createProduct);
productRoute.get("/get",productController.getAllProducts);
productRoute.get("/get/:id",productController.getProductById);
productRoute.put("/update/:id",productController.updateProduct);
productRoute.delete("/delete/:id",productController.deleteProduct);

export default productRoute;