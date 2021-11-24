// var courseName = document.querySelector('courseName');
// var courseNumber = document.querySelector('courseNumber');
// var releaseYear = document.querySelector('releaseYear');
// var date = document.querySelector('date');
// var courseActive = document.querySelector('courseActive');
// var droppedStudents = document.querySelector('droppedStudents');

var header = document.querySelector('header');

//import des div
//const div1 = document.querySelector('#headdiv');


var requestURL = 'https://4v9r83qfo4.execute-api.eu-central-1.amazonaws.com/dev';

var request = new XMLHttpRequest();

request.open('GET', requestURL);

request.responseType = 'json';
request.send();

data =JSON.parse(httpGet("https://4v9r83qfo4.execute-api.eu-central-1.amazonaws.com/dev"));
//request.onreadystatechange = handleStateChange; // Implemented elsewhere.
//request.open("GET", chrome.extension.getURL('https://4v9r83qfo4.execute-api.eu-central-1.amazonaws.com/dev'), true);
//request.send();

request.onload = function() {
  var courseInfo = request.response;
  headerCourse(courseInfo);
  //showHeroes(superHeroes);
}



function headerCourse(jsonObj) {
    var myH1 = document.createElement('h3');
    myH1.textContent = jsonObj['courseName'];
    header.appendChild(myH1);

    var courseNumber = document.createElement('p');
    courseNumber.textContent = 'courseNumber: ' + jsonObj['course'];
    header.appendChild(courseNumber);

    var releaseYear = document.createElement('p');
    releaseYear.textContent = 'releaseYear: ' + jsonObj['releaseYear'];
    header.appendChild(releaseYear);

    var date = document.createElement('p');
    var d = Array.from(jsonObj['date'].toString()).map(Number);
  
    var a = d.slice(0,4)
    var m = d.slice(4,6)
    var j = d.slice(6,8)
     
    date.textContent = 'year : ' + a + ' / month : ' + m +' / day : ' + j ;
    
    header.appendChild(date);
    console.log(typeof d);

    var activeCourse = document.createElement('p');
    activeCourse.textContent = 'the course is active : ' + jsonObj['courseActive'];
    header.appendChild(activeCourse);

    var studentDropped = document.createElement('p');
    studentDropped.textContent = 'who are the dropped students : ' + jsonObj['droppedStudents'];
    header.appendChild(studentDropped);

    var svg = d3.select("graph")
    .append("svg")
    .attr("width", 300)
    .attr("height", 300)

    .style('background-color', 'lightgrey')
    for( i in data.someData){
    console.log(data.someData[i][0])
    svg.append("circle")
      .attr("cx", (300 / 50)* data.someData[i][0])
      .attr("cy",  (300/10) * data.someData[i][1])
      .attr("r", 5);
    }
    var xScale = d3.scaleLinear()
      .domain([0, 50]) 
      .range([0, 300]);

  
    var yScale = d3.scaleLinear()
      .domain([0, 10]) 
      .range([300, 0]);

    svg.append('g')
    .attr('transform', 'translate(0, 280)')
    .call(d3.axisBottom(xScale));

    svg.append('g')
    .attr('transform', 'translate(20, 0)')
    .call(d3.axisLeft(yScale));


}


  

//premier fetch pour le premier div

//var headers = {}

// ,{
//   method : "GET",
//   mode: 'no-cors',
//   headers: headers
// }
// fetch(requestURL)
//   .then((res)=> res.json())
//   .then((data) => {
//     // data.results []
//     const lesson1 = data.results;
//     const lesson1Block = createFirstDiv(lesson1);
//     //AEGQuery.appendChild(AEGBlock);
//     console.log('Data: ', data)
//   })
//   .catch((error) => {
//     console.log('Error: ', error)
//   });

// //fonction dans le fetch


// function TitleDIV(lesson1){
//     return lesson1.map((lesson1) => {
//       return `
//         <h3>${lesson1.courseName}</h3>
//         <p>${AEG.courseNumber}</p>
//         <p>${AEG.releaseYear}</p>
//         <p>${AEG.date}</p>
//       `;
//     })
//   }

// function createFirstDiv(lesson1){
//     const lesson1TitleTemplate = `
//       ${TitleDIV(lesson1)}
//     `;
//     lesson1Query.innerHTML = lesson1TitleTemplate;
//     return lesson1Query
//   }
