const fs = require('fs');
const path = require('path');
const axios = require('axios');
const FormData = require('form-data');
const ffmpeg = require('fluent-ffmpeg');

// Put your bot token and chat id
const token = 'BOT_TOKEN';
const chatId = 'CHAT_ID';

if (process.argv.length <= 2) {
    console.log("Usage: node sendVoice.js filename");
    console.log("\te.g.");
    console.log("\tnode sendVoice.js audio.mp3");
    process.exit(1);
}

const inputFilePath = process.argv[2];
const outputFilePath = path.join(__dirname, 'audio.ogg');

const sendVoiceMessage = async (chatId, filePath) => {
    try {
        const url = `https://api.telegram.org/bot${token}/sendVoice?chat_id=${chatId}`;
        const formData = new FormData();
        formData.append('voice', fs.createReadStream(filePath), 'message.ogg');

        const response = await axios.post(url, formData, {
            headers: formData.getHeaders()
        });

        console.log(response.data);
    } catch (error) {
        console.error('Error sending voice message:', error);
    }
};

const convertToOgg = (inputFile, outputFile, callback) => {
    ffmpeg(inputFile)
        .outputOptions([
            '-vn', 
            '-acodec libopus', 
            '-b:a 32k' 
        ])
        .save(outputFile)
        .on('end', () => {
            console.log('Conversion to OGG completed');
            callback();
        })
        .on('error', (err) => {
            console.error('Error converting file:', err);
        });
};

const fileExtension = path.extname(inputFilePath).toLowerCase();
if (fileExtension === '.ogg') {
    sendVoiceMessage(chatId, inputFilePath);
} else {
    convertToOgg(inputFilePath, outputFilePath, () => {
        sendVoiceMessage(chatId, outputFilePath);
    });
}
