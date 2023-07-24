const express = require("express");
const multer = require("multer");
const cors = require("cors");
const path = require("path");
const fs = require("fs");

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

const upload = multer({ storage });

app.use(express.urlencoded({ extended: false }));
app.use('/products', express.static(path.join(__dirname, 'products')));
app.use(cors());

// routes
app.get("/", (req, res) => {
    res.send("<h1>Express Server</h1>");
});

const directoryPath = path.join(__dirname, '\\routes\\');

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

app.listen(PORT, () => console.log(`Server running on localhost:${PORT}`));
