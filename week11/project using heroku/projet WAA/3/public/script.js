//initilisation api
const API_KEY = '852d224eef292dd722f16fd2c062d935';
const IMAGE_URL = 'https://image.tmdb.org/t/p/w500';

const IMAGE_URL_AVENGER_ENDGAME = 'https://image.tmdb.org/t/p/w500/ulzhLuWrPK07P1YkdWQLZnQh1JL.jpg'

const urlMovieAvengerEndGame = 'https://api.themoviedb.org/3/search/movie?api_key=852d224eef292dd722f16fd2c062d935&query=Avengers:%20Endgame'

const urlMovie = 'https://api.themoviedb.org/3/search/movie?api_key=852d224eef292dd722f16fd2c062d935';

const urlPerson = 'http://api.tmdb.org/3/search/person?api_key=852d224eef292dd722f16fd2c062d935';

//import des div
const AEGQuery = document.querySelector('#AEG');
const reponseGood = document.querySelector('#reponseGood')
const reponseGood2 = document.querySelector('#reponseGood2')

//premier fetch pour le primier div

fetch(urlMovieAvengerEndGame)
  .then((res)=> res.json())
  .then((data) => {
    // data.results []
    const AEG = data.results;
    const AEGBlock = createFirstDiv(AEG);
    //AEGQuery.appendChild(AEGBlock);
    console.log('Data: ', data)
  })
  .catch((error) => {
    console.log('Error: ', error)
  });
  

let input3 = document.getElementById('reponse').value

//dataset fait main pour les parties non reussi avec api

let dataPeople = ["Joe Russo","Anthony Russo","Christopher Markus","Stephen McFeely","Robert Downey Jr.","Chris Evans","Mark Ruffalo","Stan Lee","Chris Hemsworth",
"Scarlett Johansson","Jeremy Renner","Brie Larson","Paul Rudd","Don Cheadle","Karen Gillan","Josh Brolin","Gwyneth Paltrow","Jon Favreau","Benedict Wong","Tessa Thompson",
"Danai Gurira","Chris Pratt","Elizabeth Olsen","Anthony Mackie","Sebastian Stan","Chadwick Boseman","Dave Bautista","Evangeline Lilly","Michelle Pfeiffer","Tom Holland",
"Ty Simpkins","Frank Grillo","Tilda Swinton","Letitia Wright","Winston Duke","Emma Fuhrmann","Hiroyuki Sanada","Terry Notary","Sean Gunn","Linda Cardellini","Hayley Atwell",
"Natalie Portman","Rene Russo","Tom Hiddleston","Pom Klementieff","Zoe Saldana","Michael Douglas","Samuel L. Jackson","Benedict Cumberbatch","Patrick Gorman","Michael A. Cook",
"William Hurt","James D'Arcy","John Slattery","Ross Marquand","Jacob Batalon","Jackson A. Dunn","Ken Jeong","Joe Russo","Cade Woodward","Yvette Nicole Brown","Callan Mulvey","Taylor Patterson",
"John Michael Morris","Brian Schaeffer","Lexi Rabe"] //j'ai du faire ca car je nai pas trouvé dans tmdb une api ou a partir dun film on a tous les acteurs mais ducoup ce nai pas case insensitive

let dataMovie = ["Iron Man","The Incredible Hulk","Iron Man 2","Thor","Captain America: The First Avenger","The Avengers","Iron Man 3","Thor: The Dark World","Captain America: The Winter Soldier",
"Guardians of the Galaxy","Avengers: Age of Ultron","Ant-Man","Captain America: Civil War","Doctor Strange","Guardians of the Galaxy Vol. 2","Spider-Man: Homecoming","Thor: Ragnarok","Black Panther",
"Avengers: Infinity War","Ant-Man and the Wasp","Captain Marvel","Avengers: Endgame","Spider-Man: Far From Home"]//j'ai fait ca car je nai pas reussi a faire une recherche boucler sur un fetch d'une api

//fonction dans le fetch

function createDataMovie(person){
  return person.map((person) => {
    console.log(person.title);
  })
}

function AEGDIV(AEG){
  return AEG.map((AEG) => {
    return `
      <h3>${AEG.title}</h3>
      <img src=${IMAGE_URL + AEG.poster_path} data-movie-id=${AEG.id}>
      <p>${AEG.release_date}</p>
    `;
  })
}

function createFirstDiv(AEG){
  const movieAEGTemplate = `
    ${AEGDIV(AEG)}
  `;
  AEGQuery.innerHTML = movieAEGTemplate;
  return AEGQuery
}

function movieDIV(movie){
  let movie2 = [movie[0]]
  return movie2.map((movie2) => {
    return `
      <h3>${movie2.title}</h3>
      <img src=${IMAGE_URL + movie2.poster_path} data-movie-id=${movie2.id}>
      <p>${movie2.release_date}</p>
    `;
  })
}

function createMovieDiv(movie){
  const movieTemplate = `
    ${movieDIV(movie)}
  `;
  reponseGood2.innerHTML = movieTemplate;
  return reponseGood2
}

function personDIV(person){
  let person2 = [person[0]]
  return person2.map((person2) => {
    return `
      <h3>${person2.name}</h3>
      <img src=${IMAGE_URL + person2.profile_path} data-movie-id=${person2.id}>
    `;
  })
}

function createAutorDiv(person){
  const personTemplate = `
    ${personDIV(person)}
  `;
  reponseGood.innerHTML = personTemplate;
  return reponseGood
}


nameFirstFilm = 'Avengers: Endgame'

var socket = io();

let username = ''

let question2 = document .getElementById("question2")
question2.style.display = "none"


//user

function registerUser(){
  let input2 = document.getElementById('username_field')
  let submit_btn = document.getElementById('btnSubmit')
  let submit_btn2 = document.getElementById('btnSubmit2')
  let user_message = document.getElementById('user_message')
  if(input2.value.length >= 3){
      //Unlock draw button
      if(submit_btn.disabled == true & submit_btn2.disabled == true){ submit_btn.disabled = false; submit_btn2.disabled = false}
      username = input2.value
      user_message.innerHTML = `hello <b>${username}</b>, nice to meet you`
  }
  else{
      if(submit_btn.disabled == false & submit_btn2.disabled == false){ submit_btn.disabled = true; submit_btn2.disabled = true}
      username = input2.value
      user_message.innerHTML = `You are no longer registered. Register to be able to see your drawings`
  }
}

function isUserRegistered(){
  return username != ''
}

addEventListener('load', () => {
  console.log("ici2")
  let submit_btn = document.getElementById('btnSubmit')
  let submit_btn2 = document.getElementById('btnSubmit2')
  let input = document.getElementById('username_field')
  submit_btn.disabled = true
  submit_btn2.disabled = true
})

//fonction pour la premiere reponse dans le quizz

function reponseAutor(){
  let input = document.getElementById('reponse').value
  let indicateur = false;
  //parcours du data set
  for (let i = 0; i < dataPeople.length; i++) {
    if(input == dataPeople[i]){
      indicateur = true;
    }
  }
  let reponseId = document.getElementById("reponseAutorId")
  
  //console.log(input)
  if(indicateur){
    console.log(1)
    //reponseId.style.display = "none"
    reponseId.innerHTML = `yes it's the good answer!`
    //reponseId.style.display = "block"
    reponseGood.style.display = "block"
    question2.style.display = "block"

    const newUrl = urlPerson + '&query=' + input;

    fetch(newUrl)
    .then((res)=> res.json())
    .then((data) => {
      // data.results []
      const person = data.results;
      const personBlock = createAutorDiv(person);
      //createDataMovie(person);
      //reponseGood.appendChild(personBlock);
      console.log('Data: ', data)
    })
    .catch((error) => {
      console.log('Error: ', error)
    });
    //console.log(dataMovie)
  }
  else{
    console.log(2)
    //reponseId.style.display = "none"
    reponseId.innerHTML = `nop it's the wrong answer`
    //reponseId.style.display = "block"
    reponseGood.style.display = "none"
    question2.style.display = "none"

  }

}

//fonction pour la deuxieme reponse dans le quizz


function reponseMovie(){
  let input = document.getElementById('reponse').value
  let indicateur = false;
  let input2 = document.getElementById('reponse2').value
  let reponseId = document.getElementById("reponseAutorId2")
  
  //console.log(input2)

  //parcours du data set
  for (let i = 0; i < dataMovie.length; i++) {
    if(input2 == dataMovie[i]){
      indicateur = true;
    }
  }

  if(indicateur == true & input2 !=  nameFirstFilm){
    console.log(1)
    //reponseId.style.display = "none"
    reponseId.innerHTML = `yes it's the good answer!`
    //reponseId.style.display = "block"
    reponseGood2.style.display = "block"

    const newUrl = urlMovie + '&query=' + input2;

    fetch(newUrl)
    .then((res)=> res.json())
    .then((data) => {
      // data.results []
      const movie = data.results;
      const movieBlock = createMovieDiv(movie);
      //createDataMovie(person);
      //reponseGood.appendChild(personBlock);
      console.log('Data: ', data)
    })
    .catch((error) => {
      console.log('Error: ', error)
    });

  }
  else if(input2 ==  nameFirstFilm){
    console.log(3)
    //reponseId.style.display = "none"
    reponseId.innerHTML = `nop it's the wrong answer because you use the movie we talked about befor`
    //reponseId.style.display = "block"
    reponseGood2.style.display = "none"
  }
  else {
    console.log(2)
    //reponseId.style.display = "none"
    reponseId.innerHTML = `nop it's the wrong answer`
    //reponseId.style.display = "block"
    reponseGood2.style.display = "none"

  }

}


// test fait pour verrification avec Stan Lee et Tom Holland avec Spider-Man: Homecoming et Avengers: Infinity War