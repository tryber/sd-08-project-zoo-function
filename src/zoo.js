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
  if (ids.length < 1) {
    return [];
  }
  const animById = [];
  ids.forEach((elem1, index) => {
    animById[index] = data.animals.find(elem => elem1 === elem.id);
  });
  return animById;
}

function animalsOlderThan(animal, age) {
  return data.animals.filter(elem => elem.name === animal)
  .every((elem1, index) => elem1.residents[index].age > age);
}

function employeeByName(employeeName) {
  if (employeeName == null) {
    return {};
  }
  return data.employees.find(elem =>
  (elem.firstName === employeeName || elem.lastName === employeeName));
}

function createEmployee(personalInfo, associatedWith) {
  const { id, firstName, lastName } = personalInfo;
  const { managers, responsibleFor } = associatedWith;
  return { id, firstName, lastName, managers, responsibleFor };
}

function isManager(id) {
  return data.employees.some((elem, index) => id === elem.managers[index]);
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  data.employees.push({id, firstName, lastName, managers, responsibleFor});
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
