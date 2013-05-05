var querystring = require("querystring");
var fs = require("fs");
var formidable = require("formidable");

function start(request, response) {
  console.log("Request handler 'start' was called.");

  var body = '<html>'+
    '<head>'+
    '<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />'+
    '</head>'+
    '<body>'+
    '<form action="/upload" enctype="multipart/form-data" method="post">'+
    '<input type="file" name="upload" multiple="multiple"/>'+
    '<input type="submit" value="Upload file" />'+
    '</form>'+
    '</body>'+
    '</html>';

  response.writeHead(200, {
    "Content-Type" : "text/html"
  });
  response.write(body);
  response.end();

}

function upload(request, response) {
  console.log("Request handler 'upload' was called.");

  var form = new formidable.IncomingForm();
  console.log("about to parse");
  form.parse(request, function(error, fields, files) {
    console.log("parsing done");
    fs.renameSync(files.upload.path, "/tmp/test.png");
    response.writeHead(200, {
      "Content-Type" : "text/html"
    });
    response.write("received image:<br/>");
    response.write("<img src='/show' />");
    response.end();
  });
}

function show(request, response) {
  console.log("Request handler 'show' was called.");
  fs.readFile("/tmp/test.png", "binary", function(error, file) {
    if (error) {
      response.writeHead(500, {
        "Content-Type" : "text/plain"
      });
      response.write(error + "\n");
      response.end();
    } else {
      response.writeHead(200, {
        "Content-Type" : "image/png"
      });
      response.write(file, "binary");
      response.end();
    }
  });
}

function newn(request, response) {
  console.log("Request handler 'start' was called.");

  var body = '<html>'+
    '<head>'+
    '<meta http-equiv="Content-Type" content="text/html; '+
    'charset=UTF-8" />'+
    '</head>'+
    '<body>'+
    '<form action="/create" method="post">'+
    '<textarea name="text" rows="20" cols="60"></textarea>'+
    '<input type="submit" value="Submit text" />'+
    '</form>'+
    '</body>'+
    '</html>';

  response.writeHead(200, {
    "Content-Type" : "text/html"
  });
  response.write(body);
  response.end();
}

function create(request, response) {
  console.log("Request handler 'create' was called.");
  var form = new formidable.IncomingForm();
  form.parse(request, function(error, fields, files) {
    response.writeHead(200, {
      "Content-Type" : "text/plain"
    });
    response.write("You've sent the text: " + fields.text);
    response.end();
  });
}

function favicon(request, response) {
  console.log("Request handler 'favicon' was called.");
  response.writeHead(200, {
    "Content-Type" : "text/plain"
  });
  response.end();
}

exports.start = start;
exports.upload = upload;
exports.show = show;
exports.newn = newn;
exports.create = create;
exports.favicon = favicon;
