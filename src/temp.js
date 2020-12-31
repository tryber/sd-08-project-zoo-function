

let sum = 100 / 3

console.log(sum.toFixed(3))

const prices = {
  'Adult': 49.99,
  'Senior': 24.99,
  'Child': 20.99
}


function increasePrices(percentage) {
  return Object.keys(prices).forEach(key => {
  prices[key] = (prices[key] + (prices[key] * percentage / 100)).toFixed(2)
})
}
increasePrices(50)
console.log(prices)