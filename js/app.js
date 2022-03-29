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
  // allProducts.push(this)


}

// localStorage.names = JSON.stringify(names);




function instantiateProducts() {
  //instantiate products
  allProducts.push(new Product('banana'));
  allProducts.push(new Product('bathroom'));
  allProducts.push(new Product('boots'));
  allProducts.push(new Product('breakfast'));
  allProducts.push(new Product('bag'));
  allProducts.push(new Product('bubblegum'));
  allProducts.push(new Product('chair'));
  allProducts.push(new Product('cthulhu'));
  allProducts.push(new Product('dog-duck'));
  allProducts.push(new Product('dragon'));
  allProducts.push(new Product('pen'));
  allProducts.push(new Product('pet-sweep'));
  allProducts.push(new Product('scissors'));
  allProducts.push(new Product('shark'));
  allProducts.push(new Product('tauntaun'));
  allProducts.push(new Product('unicorn'));
  allProducts.push(new Product('water-can'));
  allProducts.push(new Product('wine-glass'));
  allProducts.push(new Product('sweep', 'png'));
}


getItemsFromStorage();

function getItemsFromStorage() {
  if (localStorage.getItem("allProducts")) {//looking at local storage to see if all products arry exist, boolean, if oit finds all products then its gonna keep track of the views and votes.
    let parseProducts = JSON.parse(localStorage.getItem("allProducts")) //if this is a truthy, this is saying after you locate it , return as an object.
    console.log(parseProducts);
    for (let i = 0; i < parseProducts.length; i++) {// if this returns a truthy then do below.
      let constructedProduct = new Product(parseProducts[i].name, parseProducts[i].path);//constuctorproduct is an object, this will keep track of the name of the image and the path file ext.
      constructedProduct.votes = parseProducts[i].votes;// pulling the votes that the user had and then run
      constructedProduct.views = parseProducts[i].views;// images that show up on the screen.
      allProducts.push(constructedProduct)
    }
  } else {
    instantiateProducts();// if it cant find all products then its going to pull all the products.
  }

}

function saveStorage() {
  let productArrayStringified = JSON.stringify(allProducts);//giving it an assigned name prodarray stringified and converting results back to a string,
  localStorage.setItem('allProducts', productArrayStringified);//this is saving the localstorage, saving the snap shot / end results of the clicks made.
}




//functions
//get random numbers - help functions to get a random index
function getRandomNumber() {
  return Math.floor(Math.random() * allProducts.length);// the max is exclusive and the min is inclusive
}
// render images - in one function,
let uniqueProductIndexes = [];// this is for randomized images.
function renderImages() {
  while (uniqueProductIndexes.length < 6) {
    let num = getRandomNumber();
    while (uniqueProductIndexes.includes(num)) {// while is going to run as many times as it needs to until whatevers in () is false. is this thing true if it is keep running the while loop.
      num = getRandomNumber();
    }
    uniqueProductIndexes.push(num);
  }

  console.log(uniqueProductIndexes);
  let index1 = uniqueProductIndexes.shift(); //this removes the 1st item from the front of the array, this must reorder indexes
  let index2 = uniqueProductIndexes.shift();
  let index3 = uniqueProductIndexes.shift();


  imageOne.src = allProducts[index1].src; // this is to access the index of the unique products index array, this is getting the first number in that array.
  imageOne.alt = allProducts[index1].name;// this is naming it
  allProducts[index1].views++;// this is incrementing  the amount of times the images have been viewed, we have a view property inside of the constructor.


  imageTwo.src = allProducts[index2].src; // this is adding in a new
  imageTwo.alt = allProducts[index2].name;
  allProducts[index2].views++;

  imageThree.src = allProducts[index3].src;
  imageThree.alt = allProducts[index3].name;
  allProducts[index3].views++;

}
renderImages();
// console.log(uniqueProductIndexes);






// //event handlers for image clicks
function handlerImageClick(event) {
  clicksMade++;// increment the clicks made
  let imageClicked = event.target.alt;//this is telling us what image was clicked. 
  console.log(imageClicked);


  for (let i = 0; i < allProducts.length; i++) { // this is incrementing the clicks. we are going through our product array and when we know we got the right product itll increment that thing only.
    if (allProducts[i].name === imageClicked) // if all product at i is strictly equal then we have know we have the right one.
      allProducts[i].votes++;//votes is property of my constructor
  }
  if (clicksMade === ATTEMPTS_ALLOWED) {
    imageContainer.removeEventListener('click', handlerImageClick);// this is removing the event  listener and the call back functions so when we hit 25 clicks it stops.
  }
  renderImages();

}




//event handler for showing results
function handleResults() {
  if (clicksMade === ATTEMPTS_ALLOWED) {
    for (let i = 0; i < allProducts.length; i++) {
      let li = document.createElement('li');// create a list
      li.textContent = `${allProducts[i].name} had ${allProducts[i].votes} votes, and was seen ${allProducts[i].views} times`; // this is giving text contents
      results.appendChild(li); // this is showing it on the webpage. but its not  working.
    }
    saveStorage();
    showResults.removeEventListener('click', handleResults);

  }
  renderChart();
}



// //executable code
// // instantiate products
// // call the function to do things?
// renderImages();






// //event listeners
// // listen to section for image clicks
imageContainer.addEventListener('click', handlerImageClick)//this is an arguement thats gonna be called later, which is a callback function.
// //listen to "div" button to show results
showResults.addEventListener('click', handleResults);
// };

function renderChart() {
  let views = [];// containers
  let votes = [];
  let names = [];

  for (let i = 0; i < allProducts.length; i++) {
    let product = allProducts[i];//products tht go into it(objects)
    views.push(product.views);//Im pushing products views in to the views array.
    votes.push(product.votes);//Im pushing products votes in to the votes array.
    names.push(product.name);//Im pushing products name in to the names array.
  }
  const ctx = document.getElementById('myChart').getContext('2d');

  let config = {
    type: 'bar',
    data: {
      labels: names,
      datasets: [{
        label: '# of Views',
        data: views,
        backgroundColor: 'rgb(80, 206, 100, 2)',
        borderColor: 'rgba(80, 162, 235, 2)',
        borderWidth: 1
      },
      {
        label: '# of votes',
        data: votes,
        backgroundColor: 'rgba(280, 110, 106, 2)',
        borderColor: 'rgba(75, 192, 192, 3)',
        borderWidth: 1

      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      },
      //  responsive: true
    }
  };

  const myChart = new Chart(ctx, config);

}
