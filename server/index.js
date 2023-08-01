const express = require("express");
const multer = require("multer");
const cors = require("cors");
const path = require("path");
const fs = require("fs");

const denv = require("dotenv").config();

if (denv.error) {
    throw denv.error;
}

// console.log(denv.parsed);

let readAndConvertImageFiles = require('./routes/blend.js').readAndConvertImageFiles;

const app = express();
const PORT = 8000;

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
app.use(cors());

// routes
app.get("/", (req, res) => {
    res.send("<h1>Express Server</h1>");
});

const directoryPath = path.join(__dirname, 'routes');

app.get('/api/response', (req, res) => {
    // Read the response.json file and send it as the response
    const responseJsonPath = path.join(directoryPath, "response.json");
    console.log(responseJsonPath);
    const responseJsonData = fs.readFileSync(responseJsonPath, 'utf8');
    res.json(JSON.parse(responseJsonData));
});

app.post("/upload", upload.single("image"), (req, res) => {

    //    console.log(req);

    const imageUrl = `http://localhost:${PORT}/uploads/${req.file.filename}`;

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
    } catch (error) {
        console.error('Error processing images:', error);
        res.status(500).json({ error: 'Image processing failed.' });
    }
});

app.listen(PORT, () => console.log(`Server running on localhost:${PORT}`));
