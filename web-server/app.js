const express = require('express');
const path = require('path');
const port = 3000;
const app = express();
const publicDirectory = path.join(__dirname, 'public');

console.log(__dirname);
console.log(path.join(__dirname, '/public'));

app.use(express.static(publicDirectory));

app.get('/weather', ((req, res) => {
    res.send(
        {
            location: 'Hamburg, Germany',
            temperature: '22',
            unit: 'C'
        }
    );
}));

app.listen(port, () => {
   console.log("Server listening on port: "+port);
});