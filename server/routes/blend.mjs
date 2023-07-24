import axios from "axios";
import { readFile, writeFile } from "fs/promises";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

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
                'Authorization': 'Bearer <token>',
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
        var messageConfig = {
            method: 'get',
            url: `https://api.thenextleg.io/v2/message/${messageId}?expireMins=2`,
            headers: {
                'Authorization': 'Bearer <token>',
            }
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
            const responseFilePath = join(directoryPath, "response.json");
            await writeFile(responseFilePath, JSON.stringify(messageResponse, null, 2));

            console.log("\nJSON response saved successfully!");
        } else {
            console.log("\nInvalid messageResponse. Missing required properties.");
        }
    } catch (error) {
        console.log(error);
    }
}

// Function to read image files and convert them to base64 URLs
async function readAndConvertImageFiles() {
    try {
        const currentFilePath = fileURLToPath(import.meta.url);
        const currentDirectory = dirname(currentFilePath);

        
        const modelImagePath = join(currentDirectory, "model.jpg");
        const tshirtImagePath = join(currentDirectory, "tshirt.jpg");

        
        const modelImage = await readFile(modelImagePath, { encoding: "base64" });
        const tshirtImage = await readFile(tshirtImagePath, { encoding: "base64" });

        
        const imageUrls = [`data:image/jpeg;base64,${modelImage}`, `data:image/jpeg;base64,${tshirtImage}`];

        const messageId = await blendImages(imageUrls);
        const messageResponse = await getMessage(messageId);
        console.log(JSON.stringify(messageResponse));

        const jsonDirectory = dirname(modelImagePath);
        await saveJson(messageResponse, jsonDirectory);

    } catch (error) {
        console.log("Error reading image files:", error);
    }
}

readAndConvertImageFiles();
