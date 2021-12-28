const path = require('path');
const express = require('express');
const hbs = require('hbs');

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
  res.send({
    forecast: "Cloudy",
    location: "Islamabad",
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
