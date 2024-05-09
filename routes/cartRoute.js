import express from "express";
const cartRoute = express.Router();
import cartController from "../controllers/cartController.js";
import { authMiddleware } from "../middlewares/auth.js";

cartRoute.use(authMiddleware);
cartRoute.get("/get/:id", cartController.getCart);
cartRoute.post("/create", cartController.addToCart);

cartRoute.delete("/delete", cartController.removeFromCart);

export default cartRoute;
