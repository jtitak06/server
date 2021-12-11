const { writeFile, mkdirSync, existsSync, mkdir } = require("fs");
const { join, extname } = require("path");
const fetch = require("isomorphic-fetch");

let filePath = join(__dirname, "chirps.json");
let filePath2 = join(__dirname, "popular-articles.json");

let chirps = [
  {
    author: "Jeff Titak",
    content: "My first chirp",
  },
  {
    author: "Jeff Titak",
    content: "My first chirp",
  },
  {
    author: "Jeff Titak",
    content: "My first chirp",
  },
  {
    author: "Jeff Titak",
    content: "My first chirp",
  },
  {
    author: "Jeff Titak",
    content: "My first chirp",
  },
];

fetch("https://reddit.com/r/programmingHumor.json")
  .then((res) => res.json())
  .then(({ data: { children } }) => {
    console.log(children);

    //    let articles = [];
    let imageExts = [".png", ".jpeg", ".jpg", ".gif", ".svg"];

    for (let article of children) {
      //        articles.push({url: article.data.url, title: article.data.title, author: article.data.author})
      if (imageExts.includes(extname(article.data.url))) {
        fetch(article.data.url)
          .then((res) => res.arrayBuffer())
          .then((data) => {
              if (!existsSync("./images")) {
                mkdirSync("./images")
              }
            writeFile(
              join(__dirname, "images", article.data.id + extname(article.data.url)),
              Buffer.from(data),
              (err) => {
                if (err) return console.error(err);

                console.log("Extracted article info.");
              }
            );
          });
      }
    }
  })
  .catch((err) => console.error(err));

//writeFile(filePath, JSON.stringify(chirps), (err) => {
//    if (err) return console.error(err);
//
//    console.log("Chirps works!");
//})
