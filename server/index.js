const express = require("express");
const app = express();

const path = require("path");

app.use(express.json());

app.get("/", (req, res) => {
    res.send("<h1>Express Server</h1>");
})

app.listen(3000, () => console.log(`Server running on http://localhost:3000`));