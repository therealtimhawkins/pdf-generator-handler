const axios = require('axios');
const fs = require('fs');
const template = require('es6-template-strings');
const url = process.env.GENERATOR_URL;

const runGenerator = async (aws, templateData) => {
  readFile(aws.fileName)
    .then(file => {
      const updatedFile = template(file, templateData);
      const base64File = Buffer.from(updatedFile).toString('base64');
      return base64File;
    })
    .then(base64File => {  
      console.log('File read successfully...');

      const requestBody = {
        "bucket": aws.bucketName,
        "key": aws.key,
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
    fs.readFile(fileName, 'utf-8', (err, data) => {
        err ? reject(err) : resolve(data);
    });
  });
};

const sendFileToGenerator = (requestBody) => {
  axios.post(url, requestBody)
    .then(response => console.log(response.data));
}

const awsDetails = {
  fileName: './input.html',
  bucketName: 'pdfs-from-generator',
  key: 'request-key-testing-css-second',
};
const templateData = {
  name: 'Timothy',
  surname: 'Hawkins',
  age: '26'
};
runGenerator(awsDetails, templateData);