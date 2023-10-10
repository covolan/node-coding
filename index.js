const http = require("http");
const path = require("path");
const fs = require("fs");

const server = http.createServer((request, response) => {
  let filePath = path.join(
    __dirname,
    "public",
    request.url === "/" ? "index.html" : request.url
  );

  let extname = path.extname(filePath);
  let contentType = "text/html";

  switch (extname) {
    case ".js":
      contentType = "text/javascript";
      break;
    case ".css":
      contentType = "text/css";
      break;
    case ".json":
      contentType = "application/json";
      break;
    case ".png":
      contentType = "image/png";
      break;
    case ".jpg":
      contentType = "image/jpg";
      break;
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      if (err.code == "ENOENT") {
        fs.readFile(path.join(__dirname, "public", "404.html"), (err, data) => {
          response.writeHead(200, { "Content-Type": contentType });
          response.end(data, "utf-8");
        });
      } else {
        response.writeHead(500);
        response.end(`Server Error: ${err.code}`);
      }
    } else {
      response.writeHead(200, { "Content-Type": contentType });
      response.end(data, "utf-8");
    }
  });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
