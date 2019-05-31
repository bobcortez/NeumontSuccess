import {
  randomInRange,
  flipCoin,
  PI
} from './module_a';

console.log(randomInRange(50,100));
console.log(flipCoin());
console.log('PI: ',PI);

import * as math from './module_b';

console.log(math.add(3,4));
console.log(math.subtract(7,1));

import Zombie from './module_c';

let bob = new Zombie('Bob');
bob.speak();

// Promises
let url = 'https://opentdb.com/api.php?amount=10';
fetch(url)
  .then(response => response.json())
  .then(data => {
    // let stuff = '';
    console.log(data);
    //data.results.forEach()
  })
  .catch(e => console.log(e));



