const axios = require('axios');
const fs = require('fs');
const url = 'https://8n8jszjxil.execute-api.eu-west-2.amazonaws.com/prod';

const runGenerator = async (fileName, bucketName, key) => {
  readFile(fileName)
    .then((base64File) => {
      console.log('File read successfully...');

      const request = {
        "bucket": bucketName,
        "key": key,
        "options": {
          "pageSize": "letter"
        },
        "htmlDoc": base64File
      };

      axios.post(url, request)
        .then(response => console.log(response.data));
    });
}

const readFile = (fileName) => {
  return new Promise((resolve, reject) => {
    fs.readFile(fileName, 'base64', (err, data) => {
        err ? reject(err) : resolve(data);
    });
  });
};

runGenerator('./input.html', 'pdfs-from-generator', 'request-key');