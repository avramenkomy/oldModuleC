//IIFE
// let x = (function (a, b){
//     return a + b
// })(2, 3); //5
//console.log(x);

console.log((function (a, b){
    return a + b
})(2, 3)); //5

//arrow functions
console.log(((a, b) => a + b)(2, 4)); //6