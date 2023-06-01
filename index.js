const fs = require("fs");
const http = require("http");
const url = require("url");

const tempOverview = fs.readFileSync(
  `${__dirname}/templates/overview.html`,
  "utf-8"
);
const tempProduct = fs.readFileSync(
  `${__dirname}/templates/product.html`,
  "utf-8"
);
const tempCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  "utf-8"
);
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataObj = JSON.parse(data);
const replaceTemplate = (temp, product) => {
  let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName);
  output = output.replace(/{%IMAGE%}/g, product.image);
  output = output.replace(/{%FROM%}/g, product.from);
  output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
  output = output.replace(/{%QUANTITY%}/g, product.quantity);
  output = output.replace(/{%DESCRIPTION%}/g, product.description);
  output = output.replace(/{%ID%}/g, product.id);
  output = output.replace(/{%DESCRIPTION%}/g, product.description);

  if (!product.organic) {
    output = output.replace(/{%NOT_ORGANIC%}/g, "Not Organic");
  }

  return output;
};

const server = http.createServer((req, res) => {
  const pathname = req.url;
  if (pathname == "/" || pathname == "/overview") {
    if (pathname == "/") {
      res.end("Home Page here");
    } else {
      res.writeHead(200, { "Content-type": "text/html" });
      const cardsHtml = dataObj
        .map((el) => replaceTemplate(tempCard, el))
        .join("");
      const output = tempOverview.replace(/{%PRODUCT_CARDS%}/g, cardsHtml);
      res.end(output);
    }
  } else res.writeHead(404);
  res.end("Page Not Found");
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Server runnig at port 8000");
});
