const axios = require("axios");
const { readFile, writeFile } = require("fs").promises;
const { dirname, join } = require("path");
const cloudinary = require('cloudinary').v2;

const denv = require("dotenv").config();
if (denv.error) {
    throw denv.error;
}
// console.log(denv.parsed);

async function blendImages(urls) {
    try {
        var blendData = JSON.stringify({
            "urls": urls,
            "ref": "",
            "webhookOverride": ""
        });

        var blendConfig = {
            method: 'post',
            url: 'https://api.thenextleg.io/v2/blend',
            headers: {
                'Authorization': `Bearer ${process.env.BEARER_TOKEN}`,
                'Content-Type': 'application/json'
            },
            data: blendData
        };

        var blendResponse = await axios(blendConfig);
        var messageId = blendResponse.data.messageId;
        return messageId;
    } catch (error) {
        throw error;
    }
}

async function getMessage(messageId) {
    try {
        const messageConfig = {
            method: 'get',
            url: `https://api.thenextleg.io/v2/message/${messageId}?expireMins=2`,
            headers: {
                'Authorization': `Bearer ${process.env.BEARER_TOKEN}`,
            },
        };

        var messageResponse = await axios(messageConfig);
        if (messageResponse.data.progress === 100 && messageResponse.data.response && Object.keys(messageResponse.data.response).length > 0) {
            return messageResponse.data;
        } else {
            // If the processing is not complete, wait for 2 seconds and try again
            await new Promise(resolve => setTimeout(resolve, 2000));
            return getMessage(messageId);
        }
    } catch (error) {
        throw error;
    }
}

async function saveJson(messageResponse, directoryPath) {
    try {
        if (messageResponse && messageResponse.response && messageResponse.response.imageUrls) {
            // Check if the response contains the expected imageUrls
            const responseFilePath = join(directoryPath, "response.json");
            await writeFile(responseFilePath, JSON.stringify(messageResponse, null, 2));
            console.log(responseFilePath);

            console.log("\nJSON response saved successfully!");

        } else {
            console.log("\nInvalid messageResponse. Processing not complete.");
        }
    } catch (error) {
        console.log("Error saving JSON response:", error);
    }
}


// Function to read image files and convert them to base64 URLs
async function readAndConvertImageFiles(userImage, productImage) {
    try {
        console.log('The received userImage path is: ' + userImage);
        console.log('The received productImage path is: ' + productImage);

        const currentFilePath = __dirname; // Use __dirname to get the current directory
        console.log('The current File Path is: ' + currentFilePath);

        const serverDirectory = dirname(currentFilePath); // Get the 'server' directory
        console.log('The server directory Path is: ' + serverDirectory);

        const userImagePath = join(serverDirectory, 'uploads', userImage);
        console.log('The User Image Path is: ' + userImagePath);

        const productImageUrl = await uploadImageToCloudinary(productImage);
        console.log('The product Image URL is: ' + productImageUrl);

        const userImageBase64 = await readFileAsBase64(userImagePath);

        const imageUrls = [`data:image/jpeg;base64,${userImageBase64}`, productImageUrl];

        const messageId = await blendImages(imageUrls);
        const messageResponse = await getMessage(messageId);
        console.log(JSON.stringify(messageResponse));

        const jsonResponseDirectory = join(serverDirectory, 'routes'); // Use serverDirectory for response.json path
        console.log("The JSON Response directory is: " + jsonResponseDirectory);
        await saveJson(messageResponse, jsonResponseDirectory);
    } catch (error) {
        console.log('Error reading image files:', error);
    }
}

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Function to upload an image to Cloudinary
async function uploadImageToCloudinary(imagePath) {
    try {
        const result = await cloudinary.uploader.upload(imagePath, {
            folder: 'products', // Optional: Folder where the image will be stored in the Cloudinary account
            use_filename: true, // Use the original filename of the image
            unique_filename: false, // Set to true if we want to ensure unique filenames
        });

        // Return the URL of the uploaded image
        return result.secure_url;
    } catch (error) {
        console.error('Error uploading image to Cloudinary:', error);
        throw error;
    }
}

// Function to read the image from the file path and convert it to base64
async function readFileAsBase64(filePath) {
    try {
        const buffer = await readFile(filePath);
        return buffer.toString('base64');
    } catch (error) {
        console.log('Error reading image from path:', error);
        throw error;
    }
}

module.exports = {
    readAndConvertImageFiles,
}