const { prices } = require("./data");

pricess = {
  Adult: 49.99,
  Senior: 24.99,
  Child: 20.99
}
console.log(prices)



// pricess.forEach(element => {
//     element.Adult === true ? element.Adult.length * 49.99 : 0
// });


Object.entries(prices).forEach(([key, value]) => prices[key] = value + (percentage * value / 100))

console.log(prices)