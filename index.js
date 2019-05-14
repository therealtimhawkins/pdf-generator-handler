const axios = require('axios');
const fs = require('fs');
const url = process.env.GENERATOR_URL;

const runGenerator = async (fileName, bucketName, key) => {
  readFile(fileName)
    .then((base64File) => {
      console.log('File read successfully...');

      const requestBody = {
        "bucket": bucketName,
        "key": key,
        "options": {
          "pageSize": "letter"
        },
        "htmlDoc": base64File
      };

      console.log('Sending file to PDF generator...');
      sendFileToGenerator(requestBody);
    });
}

const readFile = (fileName) => {
  return new Promise((resolve, reject) => {
    fs.readFile(fileName, 'base64', (err, data) => {
        err ? reject(err) : resolve(data);
    });
  });
};

const sendFileToGenerator = (requestBody) => {
  axios.post(url, requestBody)
    .then(response => console.log(response.data));
}

runGenerator('./input.html', 'pdfs-from-generator', 'request-key');