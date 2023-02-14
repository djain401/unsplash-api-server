"use strict";

const express = require("express");
const app = express();
var cors = require("cors");
const axios = require("axios");
require("dotenv").config();
const logger = require("./middlewares/logger.js");
const validator = require("./middlewares/validate.js");
const notFoundHandler = require("./handlers/404.js");
const errorHandler = require("./handlers/500.js");

app.use(cors());
app.use(logger);

const port = process.env.PORT;

const Photo = class {
  constructor(photo) {
    this.name = photo.user.name;
    this.imageUrl = photo.urls.raw;
    this.description = photo.description;
  }
};

app.get("/searchImage", validator, searchImageHandler);
app.get("/randomImage", randomImageHandler);
app.get("/", homeHandler);
app.get("*", notFoundHandler);

function homeHandler(request, response) {
  response.status(200).send("Hello World");
}

function searchImageHandler(request, response) {
  const title = request.query.title;
  const url = `https://api.unsplash.com/search/photos/?page=1&per_page=10&query=${title}&client_id=${process.env.UNSPLASH_KEY}`;

  axios.get(url).then((photoData) => {
    console.log(photoData.data.results);
    const object = photoData.data.results.map((photo) => {
      let obj = new Photo(photo);
      return obj;
    });
    response.status(200).send(object);
  });
}

function randomImageHandler(request, response) {
  const url = `https://api.unsplash.com/photos/random?client_id=${process.env.UNSPLASH_KEY}`;

  axios.get(url).then((photoData) => {
    let randomPhoto = new Photo(photoData.data);

    response.status(200).send(randomPhoto);
  });
}

app.use(errorHandler);
app.listen(port, console.log(`Listening to port ${port}`));
