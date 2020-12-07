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

const { animals, employees } = require('./data');
const data = require('./data');

function animalsByIds(...ids) {
  if(ids.length === 0) { return ids = []};

  return ids.map(eachId => animals.find(animal => animal.id === eachId)); 
}

function animalsOlderThan(animal, age) {
  const findAnimal = animals.find(element => element.name === animal);
  findAnimal.residents.every(elem => elem.age >= age);
}


function employeeByName(employeeName) {
  if(employeeName === undefined) {return employeeName = {} }

  return employees.find(eachName => eachName.name === employeeName)
  
}

function createEmployee(personalInfo, associatedWith) {
}

function isManager(id) {
  return employees.some(eachEmployee => eachEmployee.managers.includes(id));
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
