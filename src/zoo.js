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

const { animals } = require('./data');
const data = require('./data');

function animalsByIds(...ids) {
  // seu código aqui
  return animals.filter(({ id }) => ids.includes(id));
}

function animalsOlderThan(animal, age) {
  // seu código aqui
  return animals.find(current =>
  current.name === animal).residents.every(resident => resident.age >= age);
}

function employeeByName(employeeName) {
  // seu código aqui
  if (typeof employeeName !== 'string' || employeeName.length === 0) return {};
  return data.employees.find(element => element.firstName === employeeName) || 
  data.employees.find(element => element.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  // seu código aqui
  return ({ ...personalInfo, ...associatedWith });
}

function isManager(id) {
  // seu código aqui
  return data.employees.some(element => element.managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  // seu código aqui
  return data.employees.push({ id, firstName, lastName, managers, responsibleFor });
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
