import axios from "axios";
import fs from "fs";

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
                'Authorization': 'Bearer <your-token>',
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
                'Authorization': 'Bearer <your-token>',
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

async function saveImages(messageResponse) {
    try {
        if (messageResponse && messageResponse.response && messageResponse.response.imageUrls) {
            // Save the response JSON
            fs.writeFileSync('response.json', JSON.stringify(messageResponse, null, 2));

            // Create a simple HTML page to display the images
            let htmlContent = `
            <!DOCTYPE html>
            <html>
            <head>
              <title>Blended Images</title>
            </head>
            <body>
          `;

            // Add image tags for each URL
            const imageUrls = messageResponse.response.imageUrls;
            for (let i = 0; i < imageUrls.length; i++) {
                htmlContent += `<img src="${imageUrls[i]}" alt="Blended Image">\n`;
            }

            // Close the HTML page
            htmlContent += `
            </body>
            </html>
          `;

            // Save the HTML content to a file
            fs.writeFileSync("index.html", htmlContent);

            console.log("Images saved successfully!");
        } else {
            console.log("Invalid messageResponse. Missing required properties.");
        }
    } catch (error) {
        console.log(error);
    }
}

// Usage for testing:
var imageUrls = ["https://images.unsplash.com/photo-1618354691438-25bc04584c23?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=415&q=80", "https://images.unsplash.com/photo-1623366302587-b38b1ddaefd9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=725&q=80"];

blendImages(imageUrls)
    .then(async function (messageId) {
        const messageResponse = await getMessage(messageId);
        console.log(JSON.stringify(messageResponse));

        // Save the images
        await saveImages(messageResponse);
    })
    .catch(function (error) {
        console.log(error);
    });