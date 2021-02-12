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

const { animals, employees, hours, prices } = require('./data');
const data = require('./data');

function animalsByIds(...ids) {
  return animal.filter(animal => ids.includes(animal.id))
}

function animalsOlderThan(animal, age) {
}

function employeeByName(employeeName) {
}

function createEmployee(personalInfo, associatedWith) {
}

function isManager(id) {
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
}

function animalCount(species) {
  
}

function entryCalculator(entrants) {
}

function animalMap(options) {
  // seu código aqui
}

function schedule(dayName) {
  
}

function oldestFromFirstSpecies(id) {
  
}

function increasePrices(percentage) {
  
}

const animalId = (responsibleFor = []) => {
  
};

function employeeCoverage(idOrName) {
 
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
