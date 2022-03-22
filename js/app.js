'use strict'

let allProduct = [];
function Product(name, fileExtension = 'jpeg') {
  this.name = name; //<-- 'this' refers to the instance or the object that will be created.
  this.src = `img/${name}.${fileExtension}`;
  this.timeShown = 0;
  this.timesClicked = 0;
  allProduct.push(this)

}

new Product('bag');
// console.log('bag');
new Product('banana');
new Product('bathroom');
new Product('boots');
new Product('breakfast');
new Product('bubblegum');
new Product('chair');
new Product('cthulhu');
new Product('dog-duck');
new Product('dragon');
new Product('pen');
new Product('pet-sweep');
new Product('scissors');
new Product('shark');
new Product('tauntaun');
new Product('unicorn');
new Product('water-can');
new Product('win-glass');
new Product('sweep','png');

console.log(allProduct);




// let images = ["img/bag.jpeg", "img/banana.jpeg", "img/bathroom.jpeg", "img/boots.jpeg", "img/breakfast.jpeg", "img/bubblegum.jpeg", "img/chair.jpeg", "img/cthulhu.jpeg", "img/dog-duck.jpeg", "img/dragon.jpeg", "img/pen.jpeg", "img/pet-sweep.jpeg", "img/scissors.jpeg", "img/shark.jpeg", "img/tauntaun.jpeg", "img/unicorn.jpeg", "img/water-can.jpeg", "img/win-glass.jpeg", "img/sweep.png"];
// console.log(images);




//global variables
// number of attempts - 25
const ATTEMPTS_ALLOWED = 25;
// number of clicks made
let clicksMade = 0;
//empty array for all products
// const allProduct = [];
// windows into the DOM
// - section
let imageContainer = document.getElementById('container');
// - display button
let showResults = document.getElementById('show-results');
// get images from the dom to manipulate
let imageOne = document.getElementById('image-one');
let imageTwo = document.getElementById('image-two');
let imageThree = document.getElementById('image-three');
// get the ul from the dom to manipulate
let results = document.getElementById('display-results')
//console.log(showResults);



//constructors
// name
// properties
//file path
// votes
// views
//push objects into empty array


//functions
//get random numbers - help functions to get a random index
function getRandomInt() {
  return Math.floor(Math.random() * allProduct.length);
}
// render images - in one function,
function renderImages() {
  let uniqueProductIndexes = [];

while (uniqueProductIndexes.length < 3) {
  let num = getRandomNumber();
  while (uniqueProductIndexes.includes(num)){
    num = getRandomNumber();
  }
  uniqueProductIndexes.push(num);
}
console.log(uniqueProductIndexes);

imageOne.src = allProduct[uniqueProductIndexes[0]].src;
imageOne.atl = allProduct[uniqueProductIndexes[0]].name;
allProduct[uniqueProductIndexes[0]].views++;

imageTwo = allProduct[uniqueProductIndexes[1]].src;
imageTwo = allProduct[uniqueProductIndexes[1]].name;
allProduct[uniqueProductIndexes[1]].views++;

imageThree = allProduct[uniqueProductIndexes[2]].src;
imageThree = allProduct[uniqueProductIndexes[2]].name;
allProduct[uniqueProductIndexes[2]].views++;



//event handlers for image clicks
function handlerImageClick(event) {
  clicksMade++;
  let imageClicked = event.target.alt;

  console.log(imageClicked);
  for (let i = 0; i < allProduct.length; i++){
    if (allProduct[i].name === imageClicked){
      allProduct[i].votes++;
    }
  }
  renderImages();

  
  if (clicksMade === ATTEMPTS_ALLOWED){
    imageContainer.removeEventListener('click', handlerImageClick);
  }
}


//event handler for showing results

function handleResults(event){
  if(clicksMade === ATTEMPTS_ALLOWED){
    for(let i = 0; i < allProduct.length; i++){
      let li = document.createElement('li');
      li.textContent = `${allProduct[i].name} had ${allProduct[i].votes} votes, and was seen ${allProduct[i].views} times`;
      results.appendChild(li);
    }
  }
}



//executable code
// instantiate products
// call the function to do things?
renderImages();






//event listeners
// listen to section for image clicks
imageContainer.addEventListener('click', handlerImageClick)
//listen to "div" button to show results
showResults.addEventListener('click', handleResults)
}
