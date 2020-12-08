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

function animalsByIds(...ids) {
  const arr = [];
  ids.forEach((id, index) => {
    arr[index] = data.animals.find(animal => animal.id === id);
  });
  return arr;
}

function animalsOlderThan(animal, age) {
  return data.animals.find(species => species.name === animal).residents
  .every(resident => resident.age >= age);
}

function employeeByName(employeeName) {
  const newObj = data.employees
    .find(employee => (employee.firstName === employeeName || employee.lastName === employeeName));
  if (newObj === undefined) return {};
  return newObj;
}

function createEmployee({ ...personalInfo }, { managers, responsibleFor }) {
  return {
    ...personalInfo,
    managers,
    responsibleFor,
  };
}

function isManager(id) {
  return data.employees
  .some(employee => employee.managers
  .find(manager => manager === id));
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
