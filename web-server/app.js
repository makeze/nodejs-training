const express = require('express');
const port = 3000;
const app = express();

app.get('/about', ((req, res) => {
    res.send('<h1>Title</h1>')
}));

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