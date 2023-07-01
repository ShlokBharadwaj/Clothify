import mongoose from "mongoose";

const connectDB = (url) => {

    // for search functionality
    mongoose.set('strictQuery', true);

    // connect to Database
    mongoose.connect(url)
        .then(() => console.log("MongoDB connected"))
        .catch((err) => console.log(err));
}

export default connectDB;