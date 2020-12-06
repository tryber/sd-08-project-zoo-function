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
const { employees } = require('./data');

function animalsByIds(...ids) {
  return animals.filter(animal => ids.find(id => id === animal.id));
}
console.log(animalsByIds());

function animalsOlderThan(animal, age) {
  return animals.find(specie => specie.name)
  .residents.every(resident => resident.age >= age);
}
console.log(animalsOlderThan('otters', 7));

function employeeByName(employeeName) {
  if (!employeeName) return {};
  return employees.filter(employee => employeeName)
  .find(employee => employeeName === employee.firstName || employeeName === employee.lastName);
}
console.log(employeeByName());

function createEmployee(personalInfo, associatedWith) {
  return {
    ...personalInfo,
    ...associatedWith,
  };
}
console.log(createEmployee(personalInfo, associatedWith));

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
