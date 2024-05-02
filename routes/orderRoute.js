import express from "express"
const orderRoute=express.Router();
import orderController from "../controllers/orderController.js";

orderRoute.post("/create",orderController.createOrder);
orderRoute.get("/get",orderController.getAllOrders);
orderRoute.get("/get/:id",orderController.getOrderById);
orderRoute.put("/update/:id",orderController.updateOrder);
orderRoute.delete("/delete/:id",orderController.deleteOrder);

export default orderRoute;