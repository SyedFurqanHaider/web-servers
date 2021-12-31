const path = require('path');
const express = require('express');
const hbs = require('hbs');
const request = require('postman-request');

// Define paths for Express config.
const publicDirPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialPath = path.join(__dirname, '../templates/partials');

const app = express();

// Setup handlebars engine and view location.
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialPath);

// Setup static directory to serve.
app.use(express.static(publicDirPath));

app.get('', (req, res) => {
  res.render('index', {
    title: "Weather",
    name: "Furqan Haider"
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: "About Me",
    name: "Furqan Haider"
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: "Help",
    message: "This page is for your help.",
    name: "Furqan Haider"
  });
});

app.get('/weather', (req, res) => {
  if(!req.query.address) {
    return res.send({
      error: "You must provide an address."
    });
  }

  const url = `http://api.weatherstack.com/current?access_key=3baa6cdad23f368a63c7a3a37ff4a508&query=${req.query.address}`;

  request({ url: url, json: true }, (error, response) => {
    const { temperature, feelslike, weather_descriptions } = response.body.current;
    res.send({
      forecast: weather_descriptions[0],
      temperature,
      feelslike,
      address: req.query.address,
    });
  });
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: "404",
    name: "Furqan Haider",
    errorMessage: "Help article not found."
  });
});

app.get('*', (req, res) => {
  res.render('404', {
    title: "404",
    name: "Furqan Haider",
    errorMessage: "Page not found."
  });
});

app.listen(3000, () => {
  console.log("Server is up and running.");
});
