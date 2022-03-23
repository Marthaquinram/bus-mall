'use strict'



// console.log(allProduct);




// let images = ["img/bag.jpeg", "img/banana.jpeg", "img/bathroom.jpeg", "img/boots.jpeg", "img/breakfast.jpeg", "img/bubblegum.jpeg", "img/chair.jpeg", "img/cthulhu.jpeg", "img/dog-duck.jpeg", "img/dragon.jpeg", "img/pen.jpeg", "img/pet-sweep.jpeg", "img/scissors.jpeg", "img/shark.jpeg", "img/tauntaun.jpeg", "img/unicorn.jpeg", "img/water-can.jpeg", "img/win-glass.jpeg", "img/sweep.png"];
// console.log(images);




//global variables
// number of attempts - 25
const ATTEMPTS_ALLOWED = 25;
// number of clicks made
let clicksMade = 0;
//empty array for all products
let allProducts = [];
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
// console.log(showResults);



//constructors
function Product(name, fileExtension = 'jpeg') { //<--this file ext. is telling to give it a default value, and setting this parameter up itll automatically jpeg, unless its given a different value.
  this.name = name; //<-- 'this' refers to the instance or the object that will be created.
  this.src = `img/${name}.${fileExtension}`;//<-- this is the src of the image. itll know  its not the default its png.
  this.votes = 0;
  this.views = 0;
  allProducts.push(this)

}

//instantiate products
new Product('bag');
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
new Product('wine-glass');
new Product('sweep', 'png');


console.log(allProducts);



//functions
//get random numbers - help functions to get a random index
function getRandomNumber() {
  return Math.floor(Math.random() * allProducts.length);// the max is exclusive and the min is inclusive
}
// render images - in one function,
function renderImages() {
  let uniqueProductIndexes = [];// this is for randomized images.

  while (uniqueProductIndexes.length < 3) {
    let num = getRandomNumber();
    while (uniqueProductIndexes.includes(num)) {
      num = getRandomNumber();
    }
    uniqueProductIndexes.push(num);
  }



  imageOne.src = allProducts[uniqueProductIndexes[0]].src; // this is to access the index of the unique products index array, this is getting the first number in that array.
  imageOne.alt = allProducts[uniqueProductIndexes[0]].name;// this is naming it
  allProducts[uniqueProductIndexes[0]].views++;// this is incrementing  the amount of times the images have been viewed, we have a view property inside of the constructor.


  imageTwo.src = allProducts[uniqueProductIndexes[1]].src;
  imageTwo.alt = allProducts[uniqueProductIndexes[1]].name;
  allProducts[uniqueProductIndexes[1]].views++;

  imageThree.src = allProducts[uniqueProductIndexes[2]].src;
  imageThree.alt = allProducts[uniqueProductIndexes[2]].name;
  allProducts[uniqueProductIndexes[2]].views++;


  // console.log(uniqueProductIndexes);
}





// //event handlers for image clicks
function handlerImageClick(event) {
  clicksMade++;// increment the clicks made
  let imageClicked = event.target.alt;//this is telling us what image was clicked. 
  console.log(imageClicked);


  for (let i = 0; i < allProducts.length; i++) { // this is incrementing the clicks. we are going through our product array and when we know we got the right product itll increment that thing only.
    if (allProducts[i].name === imageClicked) {// if all product at i is strictly equal then we have know we have the right one.
      allProducts[i].votes++;//votes is property of my constructor
    }
  }
  renderImages();

  if (clicksMade === ATTEMPTS_ALLOWED) {
    imageContainer.removeEventListener('click', handlerImageClick);// this is removing the event  listener and the call back functions so when we hit 25 clicks it stops.
  }

}




//event handler for showing results
function handleResults(event) {
  if (clicksMade === ATTEMPTS_ALLOWED) {
    for (let i = 0; i < allProducts.length; i++) {
      let li = document.createElement('li');// create a list
      li.textContent = `${allProducts[i].name} had ${allProducts[i].votes} votes, and was seen ${allProducts[i].views} times`; // this is giving text contents
      results.appendChild(li); // this is showing it on the webpage. but its not  working.
    }
  }
}



// //executable code
// // instantiate products
// // call the function to do things?
renderImages();






// //event listeners
// // listen to section for image clicks
imageContainer.addEventListener('click', handlerImageClick)//this is an arguement thats gonna be called later, which is a callback function.
// //listen to "div" button to show results
showResults.addEventListener('click', handleResults);
// };
