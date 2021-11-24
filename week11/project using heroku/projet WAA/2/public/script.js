//init
const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')
console.log("ici1")


var socket = io();

let username = ''


let isDrawing = false;
let x=0;
let y=0;

//user

function registerUser(){
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  let input = document.getElementById('username_field')
  let draw_btn = document.getElementById('display2')
  let draw_btn2 = document.getElementById('display')
  let user_message = document.getElementById('user_message')
  if(input.value.length >= 3){
      //Unlock draw button
      if(draw_btn.disabled == true & draw_btn2.disabled == true){ draw_btn.disabled = false; draw_btn2.disabled = false}
      username = input.value
      user_message.innerHTML = `hello <b>${username}</b>, nice to meet you`
  }
  else{
      if(draw_btn.disabled == false & draw_btn2.disabled == false){ draw_btn.disabled = true; draw_btn2.disabled = true}
      username = input.value
      user_message.innerHTML = `You are no longer registered. Please register to be able to draw`
  }
}

function isUserRegistered(){
  return username != ''
}

//eventListener

addEventListener('load', () => {
  console.log("ici2")
  canvas.width = innerWidth
  canvas.height = innerHeight
  let draw_btn = document.getElementById('display2')
  let draw_btn2 = document.getElementById('display')
  let input = document.getElementById('username_field')
  input.value = ''
  draw_btn.disabled = true
  draw_btn2.disabled = true
})





canvas.addEventListener('mousedown', function(e) {
  if(username != ''){
      const rect = canvas.getBoundingClientRect()
      x = e.clientX - rect.left
      y = e.clientY - rect.top
      console.log("x: " + x + " y: " + y)
      //Modify last drawer message
      let last_drawer = document.getElementById('last_drawer')
      last_drawer.innerHTML = `The last drawer is <b>YOU</b>`

      isDrawing=true
  }
  else{
      let user_message = document.getElementById('user_message')
      user_message.innerHTML = `<span style="color:red;">You must be registered to draw !</span>`
  }

})

canvas.addEventListener('mousemove', e => {
  if (isDrawing === true) {
    //drawCircleAtCursor(x,y,canvas, e)
    drawLine(x, y, e.offsetX, e.offsetY);
    x = e.offsetX;
    y = e.offsetY;
    sendLine({user: username, x: x, y: y, x2: e.offsetX, y2: e.offsetY, pencil_color: document.getElementById('pencil_color').value, pencil_size: parseInt(document.getElementById('pencil_size').value)})

  }
});

window.addEventListener('mouseup', e => {
  if (isDrawing === true) {
    //drawCircleAtCursor(x,y,canvas, e)
    drawLine(x, y, e.offsetX, e.offsetY);
    x = 0;
    y = 0;
    isDrawing = false;
  }
});

addEventListener('resize', () => {
  canvas.width = innerWidth
  canvas.height = innerHeight
})

//draw with pencil

function drawLine(x1, y1, x2, y2) {
  let pencil_color = document.getElementById('pencil_color').value
  let pencil_size = parseInt(document.getElementById('pencil_size').value)
  ctx.beginPath();
  ctx.strokeStyle = pencil_color;
  ctx.lineWidth = pencil_size;
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
  ctx.closePath();
}

// function drawCircleAtCursor(x,y,canvas, event) {
//   let pencil_color = document.getElementById('pencil_color').value
//   let pencil_size = parseInt(document.getElementById('pencil_size').value)
//   ctx.beginPath()
//   ctx.arc(x, y, 10/2, 0, Math.PI * 2)
//   ctx.closePath()

//   ctx.lineWidth = pencil_size
//   ctx.strokeStyle = pencil_color
//   ctx.stroke()

//   ctx.fillStyle = pencil_color
//   ctx.fill()
// }

//draw with clique

function netoyage(){
    ctx.clearRect(0, 0, canvas.width, canvas.height)
}

function Triangle(myfigure = true){
  let border = document.getElementById("borderColor").value;
  let background = document.getElementById("backgroundColor").value;
  let borderSize = parseInt(document.getElementById("borderThickness").value);
  let size = parseInt(document.getElementById("size").value);
  let start = getStartingPoint(size, borderSize)

  ctx.beginPath()
  ctx.moveTo(start[0], start[1])
  ctx.lineTo(start[0], start[1]+size)
  ctx.lineTo(start[0]+size, start[1]+size)
  ctx.closePath()
  ctx.lineWidth = borderSize
  ctx.strokeStyle = border
  ctx.stroke()

  ctx.fillStyle = background
  ctx.fill()

  let triangle = {
    user: username,
    forme: 'triangle',
    size: size,
    borderSize: borderSize,
    start: start,
    borderColor: border,
    backgroundColor: background
  }
  if(myfigure){
    sendData(triangle)
  }
}

function Square(myfigure = true){
  let border = document.getElementById("borderColor").value;
  let background = document.getElementById("backgroundColor").value;
  let borderSize = parseInt(document.getElementById("borderThickness").value);
  let size = parseInt(document.getElementById("size").value);
  let start = getStartingPoint(size, borderSize)

  ctx.rect(start[0], start[1], size, size)

  ctx.lineWidth = borderSize
  ctx.strokeStyle = border
  ctx.stroke()

  ctx.fillStyle = background
  ctx.fill()

  let square = {
    user: username,
    forme: 'square',
    size: size,
    borderSize: borderSize,
    start: start,
    borderColor: border,
    backgroundColor: background
  }
  if(myfigure){
    sendData(square)
  }
}

function Circle(myfigure = true){
  let border = document.getElementById("borderColor").value;
  let background = document.getElementById("backgroundColor").value;
  let borderSize = parseInt(document.getElementById("borderThickness").value);
  let size = parseInt(document.getElementById("size").value);
  let start = getStartingPoint(size, borderSize)

  ctx.beginPath()
  ctx.arc(start[0], start[1], size/2, 0, Math.PI * 2)
  ctx.closePath()

  ctx.lineWidth = borderSize
  ctx.strokeStyle = border
  ctx.stroke()

  ctx.fillStyle = background
  ctx.fill()

  let circle = {
    user: username,
    forme: 'circle',
    size: size,
    borderSize: borderSize,
    start: start,
    borderColor: border,
    backgroundColor: background
  }
  if(myfigure){
    sendData(circle)
  }

}

function displayAuCentre(){
    let forme = document.getElementById("forme").value;
    let border = document.getElementById("borderColor").value;
    let background = document.getElementById("backgroundColor").value;
    let borderSize = document.getElementById("borderThickness").value;
    let size = document.getElementById("size").value;
    let myfigure = true


    if(forme == "square"){
      ctx.beginPath();
      ctx.fillStyle = background;
      ctx.fillRect(canvas.width/2 - size/2, canvas.height/2-size/2, size, size);
      ctx.strokeStyle = border;
      ctx.strokeRect(canvas.width/2 - size/2, canvas.height/2-size/2, size, size);
      ctx.lineWidth = borderSize;
      ctx.stroke();

      let square = {
        user: username,
        forme: 'square',
        size: size,
        borderSize: borderSize,
        start: canvas.width/2 - size/2,
        borderColor: border,
        backgroundColor: background
      }
      if(myfigure){
        sendData(square)
      }
    }

//   console.log(size);
    else if(forme == "triangle"){
      ctx.beginPath();
      ctx.moveTo(canvas.width/2, canvas.height/2);
      ctx.lineTo(canvas.width/2 + size/2, canvas.height/2);
      ctx.lineTo(canvas.width/2, canvas.height/2 - size);
      ctx.lineTo(canvas.width/2 - size/2, canvas.height/2);
      ctx.lineTo(canvas.width/2, canvas.height/2);

      ctx.fillStyle = background;
      ctx.fill();
      ctx.strokeStyle = border;
      ctx.lineWidth = borderSize;
      ctx.stroke();

      let triangle = {
        user: username,
        forme: 'triangle',
        size: size,
        borderSize: borderSize,
        start: canvas.width/2 - size/2,
        borderColor: border,
        backgroundColor: background
        }
      if(myfigure){
        sendData(triangle)
      }
    }

    else if(forme == "circle"){
        ctx.beginPath();
        ctx.arc(canvas.width/2, canvas.height/2,size,0,2*Math.PI);
        ctx.fillStyle = background;
        ctx.fill();
        ctx.strokeStyle = border;
        ctx.lineWidth = borderSize;
        ctx.stroke();

        let circle = {
          user: username,
          forme: 'circle',
          size: size,
          borderSize: borderSize,
          start: canvas.width/2 - size/2,
          borderColor: border,
          backgroundColor: background
      }
      if(myfigure){
          sendData(circle)
      }
    }

}

function displayAleatoire(){
  let forme = document.getElementById("forme").value;

  if(forme == "square"){
    Square()
  }
//console.log(size)
  else if(forme == "triangle"){
    Triangle()
  }

  else if(forme == "circle"){
    Circle()
  }


}

function getStartingPoint(size, borderSize){
  let x = (Math.random()*(innerWidth - size - borderSize)) + borderSize
  let y = (Math.random()*(innerHeight - size - borderSize)) + borderSize
  return [x,y]
}

//socket
function sendData(data){
  socket.emit('send_figure', data)
}

function sendLine(data){
  socket.emit('send_line', data)
}

socket.on('share_figure', (figure) => {
  if(figure.forme == 'triangle'){
    Triangle(false)
  }
  else if(figure.forme == 'square'){
    Square(false)
  }
  else if(figure.forme == 'circle'){
    Circle(false)
  }
})

socket.on('share_line', (line) => {
  let last_drawer = document.getElementById('last_drawer')
  last_drawer.innerHTML = `le dernier dessinateur est <b>${line.user}</b>`
  drawLine(line.x, line.y, line.x2, line.y2)
})


//exo1

function debugBase64(base64URL){
  var win = window.open("#");
  win.document.write('<iframe src="' + base64URL  + '" frameborder="0" style="border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;" allowfullscreen></iframe>');
  win.document.close();
}

function saveAsImage(){
    // var image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
    var image = canvas.toDataURL("image/png");
    debugBase64(image);
}

//exo2

// function renderMessage(wrapper, message){
//   if(wrapper.classList.contains("fadeOut")) wrapper.classList.remove("fadeOut");
//   if(wrapper.classList.contains("fadeIn")) wrapper.classList.remove("fadeIn");

//   wrapper.classList.add("fadeIn");
//   setTimeout(function(){
//       wrapper.classList.add("fadeOut");
//   }, 4000);
//   wrapper.innerHTML = message;
//   save_button_label.classList.remove('hide');
//   save_button_spinner.classList.add('hide');
// }

// function upload_to_server(canvasData){

//   return fetch("/", {
//       method: 'POST',
//       headers: {'Content-Type': 'application/json'},
//       body: JSON.stringify({photo: canvasData})
//   }).then(function (value) {
//       if(value.ok){
//           return value.json().then(function (response) {
//               if(response.status === "success"){
//                   drag = false;
//                   buttons_shown = false;
//                   selection_editing_buttons.classList.add("hide");
//                   selection_editing_description.classList.remove("hide");
//                   update = true;
//                   rectangles = [];
//                   return renderMessage(success, upload_success_msg);
//               }else{
//                   return renderMessage(errors, upload_error_msg);
//               }
//           })
//       }
//   }).catch(function (reason) {
//       return renderMessage(errors, upload_error_msg);
//   })

// }

// function saveOnServer(){
//   // save_button_label.classList.add('hide');
//   // save_button_spinner.classList.remove('hide');

//   // console.log(crop_rect.startX); // I have start position x
//   // console.log(crop_rect.startY); // I have start position x
//   // console.log(crop_rect.w);      // I have width
//   // console.log(crop_rect.h);      // I have height

//   // html2canvas(document.getElementById("result")).then(function(canvas) {
//   //     var canvasData = canvas.toDataURL("image/" + image_type + "");
//   //     upload_to_server(canvasData)
//   // });

//   var image = canvas.toDataURL("image/png");
//   upload_to_server(image)
// }