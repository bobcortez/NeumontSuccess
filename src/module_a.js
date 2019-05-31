export function randomInRange( min, max ){
  return Math.floor(Math.random() * (max-min + 1)) + min;
}

export function flipCoin() {
  let myRand = Math.round(Math.random());
  if(myRand == 0){
    return('heads');
  }else{
    return('tails');
  }
}

export const PI = 3.14159265359;