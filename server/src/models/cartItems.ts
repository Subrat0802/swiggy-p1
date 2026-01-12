import mongoose from "mongoose";


const cartItems = new mongoose.Schema({
    itemId: {
        type: String,
        required: true
    },
    image:{
        type:String,
        required: true,
    },
    name:{
        type:String,
        required: true,
    },
    price:{
        type:Number,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required: true
    }
})

const Cart = mongoose.model("Cart", cartItems);
export default Cart;