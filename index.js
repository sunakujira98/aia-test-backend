const express = require("express");
const app = express();
const request = require("request");
const path = require("path");

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "frontend/build")));

// index api page
app.get("/api", (req, res) => {
  // this is my api url, change with yours
  let url =
    "https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=782f256cab3f792783b80e2b30e10569&tags=cats&format=json&nojsoncallback=1&per_page=20&page=1&tags=cats";

  req.pipe(request(url)).pipe(res);
});

// to implement paging and searching
app.get("/api/:page-:tags", (req, res) => {
  // this is my api url, change with yours
  let url =
    "https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=782f256cab3f792783b80e2b30e10569&tags=cats&format=json&nojsoncallback=1&per_page=20&page=" +
    req.params.page +
    "&tags=" +
    req.params.tags;
  req.pipe(request(url)).pipe(res);
});

// searching
app.get("/api/search/:tags", (req, res) => {
  // this is my api url, change with yours
  let url =
    "https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=782f256cab3f792783b80e2b30e10569&tags=cats&format=json&nojsoncallback=1&per_page=20&tags=" +
    req.params.tags;
  req.pipe(request(url)).pipe(res);
});

const port = process.env.PORT || 5000;
app.listen(port);
