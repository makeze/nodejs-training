const express = require('express');
const path = require('path');
const hbs = require('hbs');
const port = 3000;

const app = express();

const publicDirectory = path.join(__dirname, 'public');
const viewsPath = path.join(__dirname, 'templates/views');
const partialsPath = path.join(__dirname, 'templates/partials');

// define paths for express config
console.log(__dirname);
console.log(path.join(__dirname, '/public'));

// setup handlebars
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// setup static directory
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