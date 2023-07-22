import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    imageURL: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
});

const Product = mongoose.model("Product", productSchema);

export default Product;