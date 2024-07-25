const fs = require('fs');
const path = require('path');
const axios = require('axios');
const FormData = require('form-data');
const ffmpeg = require('fluent-ffmpeg');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const prompt = (question) => {
    return new Promise((resolve) => {
        rl.question(question, (answer) => resolve(answer));
    });
};

const getInput = async () => {
    let token = process.env.BOT_TOKEN || process.argv[2] || await prompt('Enter your Telegram bot token: ');
    let chatId = process.env.CHAT_ID || process.argv[3] || await prompt('Enter your Telegram chat ID: ');
    let inputFilePath = process.argv[4] || await prompt('Enter the path to the audio file: ');

    rl.close();

    return { token, chatId, inputFilePath };
};

const sendVoiceMessage = async (token, chatId, filePath) => {
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

const main = async () => {
    const { token, chatId, inputFilePath } = await getInput();
    const outputFilePath = path.join(__dirname, 'audio.ogg');

    const fileExtension = path.extname(inputFilePath).toLowerCase();
    if (fileExtension === '.ogg') {
        sendVoiceMessage(token, chatId, inputFilePath);
    } else {
        convertToOgg(inputFilePath, outputFilePath, () => {
            sendVoiceMessage(token, chatId, outputFilePath);
        });
    }
};

main();
