const axios = require("axios");
const fs = require("fs");

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

function readAndConvertImageFiles() {
    try {
        const modelImage = fs.readFileSync(__dirname + "\\model.jpg", { encoding: "base64" });
        const tshirtImage = fs.readFileSync(__dirname + "\\tshirt.jpg", { encoding: "base64" });

        // Use the base64 URLs in the blendImages function
        const imageUrls = [`data:image/jpeg;base64,${modelImage}`, `data:image/jpeg;base64,${tshirtImage}`];

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
    } catch (error) {
        console.log("Error reading image files:", error);
    }
}

// Call the function to read and convert image files
readAndConvertImageFiles();
