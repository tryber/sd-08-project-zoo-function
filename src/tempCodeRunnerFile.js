const data = require('../src/data');
const {animals, employees, prices, hours} = data;

function animalsByIds(...ids) {
  return ids.map(idFind => animals.find(animal => animal.id === idFind));
}

function animalsOlderThan(animal, age) {
  const animalFound = animals.find(specie => specie.name === animal);
  console.log(animalFound);
  return animalFound.residents.every((objAnimal) => objAnimal.age > age);
}

animalsOlderThan('otters', 7);