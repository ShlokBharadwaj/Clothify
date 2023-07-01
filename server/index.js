import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';

import connectDB from './mongodb/connect.js';
import postRoutes from './routes/postRoutes.js';
import dalleRoutes from './routes/dalleRoutes.js';
import thenextlegRoutes from './routes/thenextlegRoutes.js';

// import environment variables from dotenv file.
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));

app.use('/api/v1/post', postRoutes);
app.use('/api/v1/dalle', dalleRoutes);
app.use('/api/v1/thenextleg', thenextlegRoutes);

app.get('/', async (req, res) => {
    res.send('Hello World!');
});

const startServer = async () => {

    try {
        connectDB(process.env.MONGODB_URL);
        app.listen(8080, () => console.log('Server is running on port 8080 http://localhost:8080'));
    } catch (error) {
        console.log(error);
    }


}

startServer();