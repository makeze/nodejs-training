const request = require("request");

// wrong api key? check
const url = "http://api.weatherstack.com/current\n" +
    "?access_key=79be985d52d12feb7cd3ecbc472740eb\n" +
    "&query=New York";

request({url: url}, (error, response) => {
    const data = JSON.parse(response.body);
    console.log(data);
});