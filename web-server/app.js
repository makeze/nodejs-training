const express = require('express');
const path = require('path');
const port = 3000;
const app = express();
const publicDirectory = path.join(__dirname, 'public');

console.log(__dirname);
console.log(path.join(__dirname, '/public'));

app.set('view engine', 'hbs');
app.use(express.static(publicDirectory));

app.get('', (req, res) => {
   res.render('index', {
       title: 'Weather App',
       name: 'Max Gana'
   });
});

app.get('/about', (req, res) => {
   res.render('about', {
       title: 'About',
       name: 'Max Gana'
   });
});


app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        helpMessage: 'Here be help page in future'
    });
});

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