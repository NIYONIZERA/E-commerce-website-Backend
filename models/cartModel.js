import mongoose from "mongoose";

const cartSchema=new mongoose.Schema({

    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    quantity: { type: Number, default: 0 }
})

const cartModel=mongoose.model("cart",cartSchema)

export default cartModel;