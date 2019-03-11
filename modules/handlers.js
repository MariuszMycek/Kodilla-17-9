var fs = require("fs-extra");
var multiparty = require("multiparty");

var fileName;

function sendTemplate(path, response) {
  fs.readFile(path, function(err, html) {
    response.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    response.write(html);
    response.end();
  });
}
exports.upload = function(request, response) {
  console.log("Rozpoczynam obsługę żądania upload");
  var form = new multiparty.Form();
  form.parse(request, function(error, fields, files) {
    fs.moveSync(files.upload[0].path, files.upload[0].originalFilename, {
      overwrite: true
    });
    sendTemplate("templates/upload.html", response);
    fileName = files.upload[0].originalFilename;
  });
};

exports.welcome = function(request, response) {
  console.log("Rozpoczynam obsługę żądania welcome.");
  sendTemplate("templates/start.html", response);
};

exports.show = function(request, response) {
  console.log("Rozpoczynam obsługę żądania show.");
  fs.readFile(fileName, "binary", function(err, file) {
    response.writeHead(200, { "Content-Type": "image/png" });
    response.write(file, "binary");
    response.end();
  });
};

exports.error = function(request, response) {
  console.log("Nie wiem co robić.");
  response.write("404 :(");
  response.end();
};

exports.styles = function(request, response) {
  console.log("Rozpoczynam obsługę żądania styles.");
  var fileStream = fs.createReadStream("./css/style.css", "utf-8");
  response.writeHead(200, { "Content-Type": "text/css" });
  fileStream.pipe(response);
};
