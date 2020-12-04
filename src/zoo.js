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

const data = require('./data');

// const { animals, employees, hours, price } = data;
const { animals, employees } = data;

function animalsByIds(...ids) {
  const filtredAnimals = animals.filter(animal => ids.some(id => animal.id === id));
  return filtredAnimals || [];
}

function animalsOlderThan(animalName, age) {
  const residents = animals.filter(animal => animal.name === animalName)[0].residents;
  return residents.every(animal => animal.age >= age);
}

function employeeByName(employeeName) {
  const employeeFirstName = employees.find(({ firstName }) => firstName === employeeName);
  const employeeLastName = employees.find(({ lastName }) => lastName === employeeName);
  return employeeFirstName || employeeLastName || {};
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
