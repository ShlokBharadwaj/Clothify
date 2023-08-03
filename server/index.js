const express = require("express");
const multer = require("multer");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const WebSocket = require("websocket");

// const denv = require("dotenv").config();

// if (denv.error) {
//     throw denv.error;
// }

// console.log(denv.parsed);

let readAndConvertImageFiles = require('./routes/blend.js').readAndConvertImageFiles;

const app = express();

// Specify the allowed origin explicitly
app.use(cors({
    origin: 'https://clothify-client.vercel.app',
}));

const PORT = process.env.PORT || 8000;

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({ storage: storage });

app.use(express.urlencoded({ extended: false }));
app.use('/products', express.static(path.join(__dirname, 'products')));

// WebSocket server
const httpServer = require('http').createServer(app);
const wsServer = new WebSocket.server({ httpServer });

// Store the connected WebSocket clients
const clients = [];

// Handle the WebSocket clients
wsServer.on("request", (request) => {
    const connection = request.accept(null, request.origin);

    // Add the connection to the clients array
    clients.push(connection);

    // Remove the connection from the clients array when it is closed
    connection.on("close", () => {
        const index = clients.indexOf(connection);
        if (index !== -1) {
            clients.splice(index, 1);
        }
    });
});

// Broadcast message to all connected clients
function broadcastMessage(message) {
    clients.forEach((client) => {
        client.sendUTF(JSON.stringify(message));
    });
}

// routes
app.get("/", (req, res) => {
    res.send("<h1>Express Server</h1>");
});

const directoryPath = path.join(__dirname, 'routes');

fs.readdir(directoryPath, (err, files) => {
    if (err) {
        console.error('Error reading directory:', err);
    } else {
        console.log('Files in the directory:', files);
    }
});

app.get('/api/response', (req, res) => {
    // Read the response.json file and send it as the response
    const responseJsonPath = path.join(directoryPath, "response.json");
    console.log("The response JSON file path is: " + responseJsonPath);
    const responseJsonData = fs.readFileSync(responseJsonPath, 'utf8');
    res.json(JSON.parse(responseJsonData));
});

app.post("/upload", upload.single("image"), (req, res) => {
    //    console.log(req);
    // const imageUrl = `http://localhost:${PORT}/uploads/${req.file.filename}`;
    const imageUrl = `${process.env.VERCEL_URL}/uploads/${req.file.filename}`;
    // Respond with the image URL
    res.json({ imageUrl });
});

app.post('/api/process-images', upload.single('userImage'), async (req, res) => {
    try {
        const userImage = req.file.filename;
        const productImage = req.body.productImage;

        await readAndConvertImageFiles(userImage, productImage);

        console.log('The user Image is: ' + userImage + ' And the Product image is: ' + productImage);

        res.json({ message: 'Image processing and response.json creation successful.' });

        // After processing the images and creating response.json, send the updated data to all connected clients
        const responseJsonPath = path.join(directoryPath, "response.json");
        const responseJsonData = fs.readFileSync(responseJsonPath, 'utf8');
        broadcastMessage(JSON.parse(responseJsonData));
    } catch (error) {
        console.error('Error processing images:', error);
        res.status(500).json({ error: 'Image processing failed.' });
    }
});

// app.listen(PORT, () => console.log(`Server running on localhost:${PORT}`));
app.listen(PORT, () => console.log(`Server running on Vercel URL: ${process.env.VERCEL_URL}`));
