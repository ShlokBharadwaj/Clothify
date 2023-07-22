import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';

import connectDB from "./mongodb/db.js"
import Product from './mongodb/models/product.js';

// import postRoutes from './routes/postRoutes.js';
// import dalleRoutes from './routes/dalleRoutes.js';
// import thenextlegRoutes from './routes/thenextlegRoutes.js';

// import environment variables from dotenv file.
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(cors());
app.use(express.json());

// app.use('/api/v1/post', postRoutes);
// app.use('/api/v1/dalle', dalleRoutes);
// app.use('/api/v1/thenextleg', thenextlegRoutes);

// app.get('/', async (req, res) => {
//     res.send('Hello World!');
// });

// const startServer = async () => {

//     try {
//         connectDB(process.env.MONGODB_URL);
//         app.listen(8080, () => console.log('Server is running on port 8080 http://localhost:8080'));
//     } catch (error) {
//         console.log(error);
//     }


// }

// startServer();

// Connect to MongoDB
connectDB();

// Routes
const producsRoutes = Product;
app.use("/api/v1/products", producsRoutes);


// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
