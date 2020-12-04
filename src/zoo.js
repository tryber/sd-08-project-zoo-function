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
  if (ids === undefined) {
    return [];
  }
  const verifyId = ids.map((elem) => (data.animals.find((elem2) => elem2.id.includes(elem))));
  return verifyId;
}

function animalsOlderThan(animal, age) {
  const verifyAge = data.animals.find((elem) => elem.name === animal);
  return verifyAge.residents.every((elem) => elem.age > age);
}

function employeeByName(string) {
  if (string === undefined) {
    return {};
  }
  const verifyEmployee = data.employees.find((elem) => (elem.firstName === string || elem.lastName === string));
  return verifyEmployee;
}

function createEmployee(personalInfo, associatedWith) {
  // seu código aqui
}

function isManager(id) {
  const getEmployee = data.employees.map((elem) => elem.managers);
  const verifyManagement = getEmployee.some((elem) => elem.includes(id));
  return verifyManagement;
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
