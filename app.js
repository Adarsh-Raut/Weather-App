const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const { query } = require("express");

const app = express();
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const apiKey = "YOUR API KEY HERE";
const unit = "metric";

app.get("/", (req, res) => {
  const sendData = { location: "Location", temp: "Temp", disc: "Description" };
  res.render("index", { sendData: sendData });
});

app.post("/", (req, res) => {
  const query = req.body.cityName;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apiKey}&units=${unit}`;
  https.get(url, (response) => {
    response.on("data", (data) => {
      const weatherData = JSON.parse(data);
      temperature = weatherData.main.temp;
      weatherDescription = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imageURL = `http://openweathermap.org/img/wn/${icon}@2x.png`;
      const sendData = {
        location: query,
        temp: temperature,
        desc: weatherDescription,
        imageURL: imageURL,
      };
      res.render("index", { sendData: sendData });
    });
  });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000.");
});
