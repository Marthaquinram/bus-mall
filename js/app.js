'use strict'

function Product(name) {
this.name = name;
this.img = name + '.jpeg';
this.time_shown = 0;

}

let bag = new Product('bag');
console.log(bag);

let images = ["img/bag.jpeg","img/banana.jpeg","bathroom.jpeg","boots","breakfast.jpeg","bubblegum.jpeg","chair.jpeg","cthulhu.jpeg","dog-duck.jpeg","dragon.jpeg","pen.jpeg","pet-sweep.jpeg","scissors.jpeg","shark.jpeg","tauntaun.jpeg","unicorn.jpeg","water-can.jpeg","win-glass.jpeg"];
console.log(images);
// let index = 0;

// Img.prototype.randomImages =
// function() {
//   return.Math.floor(Math.random() *)
// }
