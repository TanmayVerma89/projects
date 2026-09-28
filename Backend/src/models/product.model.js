import mongoose from "mongoose";

const productScehma = new mongoose.Schema({
    productName: {
        type: String,
        required: true,
        unique: true
    },
    productImg: {
        type: String,
        required: true,
        unique: true
    },
    price: {
        type: Number,
        required: true,
    },
});

const productModel = mongoose.model("product", productScehma);
export default productModel;
