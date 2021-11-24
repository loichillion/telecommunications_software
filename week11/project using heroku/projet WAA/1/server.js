
var multer = require('multer');
var bodyParser = require('body-parser');



const express = require('express')
const app = express()

app.use(bodyParser.json());

var Storage = multer.diskStorage({
  destination: function(req, file, callback) {
      callback(null, "./Images");
  },
  filename: function(req, file, callback) {
      callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
  }
});

var upload = multer({
  storage: Storage
}).array("imgUploader", 3); //Field name and max count

//array(fieldname[, maxCount])

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/public/index.html");
});
app.post("/api/Upload", function(req, res) {
  upload(req, res, function(err) {
      if (err) {
          return res.end("Something went wrong!");
      }
      return res.end("File uploaded sucessfully!.");
  });
});

// var formidable = require('formidable');
// var fs = require('fs');

// app.get("/",function (req, res) {
//   if (req.url == '/fileupload') {
//     var form = new formidable.IncomingForm();
//     form.parse(req, function (err, fields, files) {
//       var oldpath = files.filetoupload.path;
//       var newpath = 'C:/Users/Your Name/' + files.filetoupload.name;
//       fs.rename(oldpath, newpath, function (err) {
//         if (err) throw err;
//         res.write('File uploaded and moved!');
//         res.end();
//       });
//  });
//    } //else {
//   //   res.writeHead(200, {'Content-Type': 'text/html'});
//   //   res.write('<form action="fileupload" method="post" enctype="multipart/form-data">');
//   //   res.write('<input type="file" name="filetoupload"><br>');
//   //   res.write('<input type="submit">');
//   //   res.write('</form>');
//   //   return res.end();
//   // }
// })

const port = process.env.PORT || 8080
const http = require('http').createServer(app)
const io = require('socket.io')(http)

app.use(express.static('public'))

//I listen for socket connection
io.on('connect', (socket) => {
  //Once a user is connected I wait for him to send me figure on the event 'send_figure' or line with the event 'send_line'
  console.log('New connection')
  socket.on('send_figure', (figure_specs) => {
    //Here I received the figure specs, all I do is send back the specs to all other client with the event share figure
    socket.broadcast.emit('share_figure', figure_specs)
  })

  socket.on('send_line', (line_specs) => {
    //Here I received the line specs, all I do is send back the specs to all other client with the event share line
    socket.broadcast.emit('share_line', line_specs)
  })
})

http.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

