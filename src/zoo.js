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
const { animals } = data;
const { employees } = data;

function animalsByIds(...ids) {
  return animals.filter((animalInfo) => ids.includes(animalInfo.id));
}

function animalsOlderThan(animal, age) {
  return animals.find((animalInfo) => animalInfo.name === animal)
  .residents.every(resident => resident.age > age);
}

function employeeByName(employeeName) {
  return employees.find((employeeInfo) =>
  employeeInfo.firstName === employeeName ||
  employeeInfo.lastName === employeeName) || {};
}

function createEmployee(personalInfo, associatedWith) {
  return Object.assign(personalInfo, associatedWith);
}

function isManager(id) {
  return employees.some((employeeInfo) => employeeInfo.managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  employees.push(createEmployee({id, firstName, lastName}, {managers, responsibleFor}));
}

function animalCount(species) {
  const speciesCount = animals.find((animalInfo) => animalInfo.name === species);

  const animalListCount = animals.reduce((accumulator, animalInfo) => {
    accumulator[animalInfo.name] = animalInfo.residents.length;
    return accumulator;
  }, {});

  return species === undefined ? animalListCount : speciesCount.residents.length;
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
