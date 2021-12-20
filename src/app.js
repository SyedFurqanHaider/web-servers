const path = require('path');
const express = require('express');

const publicDirPath = path.join(__dirname, '../public');

const app = express();

app.use(express.static(publicDirPath));

app.get('/weather', (req, res) => {
  res.send({
    forecast: "Cloudy",
    location: "Islamabad",
  });
});

app.listen(3000, () => {
  console.log("Server is up and running.");
});
