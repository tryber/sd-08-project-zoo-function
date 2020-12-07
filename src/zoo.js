/*
eslint no-unused-vars: [
  "error",
  {
    "args": "none",
    "vars": "local",
    "varsIgnorePattern": "data"
  }
]
*/
const {
  animals, employees,
} = require('./data');
const data = require('./data');

function animalsByIds(...ids) {
  // seu código aqui
  const animal = [];
  ids.forEach(param => animal.push(animals.find(obj => obj.id === param)));
  return animal;
}

function animalsOlderThan(animal, age) {
  // seu código aqui
  const animalIdade = animals.find(param => param.name === animal)
  .residents.every(idade => idade.age > age);
  return animalIdade;
}

function employeeByName(employeeName) {
  // seu código aqui
  if (employeeName === undefined) {
    return {}; 
  }
  return employees.find(param => param.firstName === employeeName || param
    .lastName === employeeName); 
}

function createEmployee(personalInfo, associatedWith) {
  // seu código aqui
}

function isManager(id) {
  // seu código aqui
}

function addEmployee(id, firstName, lastName, managers, responsibleFor) {
  // seu código aqui
}

function animalCount(species) {
  // seu código aqui
}

function entryCalculator(entrants) {
  // seu código aqui
}

function animalMap(options) {
  // seu código aqui
}

function schedule(dayName) {
  // seu código aqui
}

function oldestFromFirstSpecies(id) {
  // seu código aqui
}

function increasePrices(percentage) {
  // seu código aqui
}

function employeeCoverage(idOrName) {
  // seu código aqui
}

module.exports = {
  entryCalculator,
  schedule,
  animalCount,
  animalMap,
  animalsByIds,
  employeeByName,
  employeeCoverage,
  addEmployee,
  isManager,
  animalsOlderThan,
  oldestFromFirstSpecies,
  increasePrices,
  createEmployee,
};
