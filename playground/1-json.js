const fs = require('fs');

const dataBuffer = fs.readFileSync('1-data.json');
const data = JSON.parse(dataBuffer.toString());

data.name = 'Maksud';
data.age = 27;
const writeJSON = JSON.stringify(data);
fs.writeFileSync('1-data.json', writeJSON);