"use strict";

const express = require("express");
const app = express();
var cors = require("cors");
app.use(cors());
const axios = require("axios");
require("dotenv").config();

const port = process.env.PORT;

const Photo = class {
  constructor(photo) {
    this.name = photo.user.name;
    this.imageUrl = photo.urls.raw;
    this.description = photo.description;
  }
};

app.get("/searchImage", getImagebyTitle);
app.get("/", homeHandler);
app.get("*", notFoundHandler);

function homeHandler(request, response) {
  response.status(200).send("Hello World");
}

function getImagebyTitle(request, response) {
  try {
    const title = request.title;
    const url = `https://api.unsplash.com/search/photos/?page=1&per_page=10&query=${title}&client_id=${process.env.UNSPLASH_KEY}`;

    axios.get(url).then((photoData) => {
      console.log(photoData.data.results);
      const object = photoData.data.results.map((photo) => {
        let obj = new Photo(photo);
        return obj;
      });
      response.status(200).send(object);
    });
  } catch (err) {
    response.status(500).send("Something went wrong", err);
  }
}

function notFoundHandler(request, response) {
  response.status(404).send("Not found");
}
app.listen(port, console.log(`Listening to port ${port}`));
