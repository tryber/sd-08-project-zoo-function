const data = require('./src/data');

function animalsOlderThan(animal, age) {
  return data.animals.find(a => a.name === animal).residents.every(r => r.age > age);
}

const result = animalsOlderThan('otters', 7);
// const result = animalsOlderThan('penguins', 10);

// const result = data
// const result = data.animals[3].residents.every(r => r.age >.animals[4].residents.every(r => r.age > 7); 10);

console.log(result);
