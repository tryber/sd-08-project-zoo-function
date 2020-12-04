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
  if (!ids) {
    return undefined;
  }
  const found = ids
  .map(id => animals.find(element => element.id === id));
  return found;
  // seu código aqui
}
console.log(animalsByIds('0938aa23-f153-4937-9f88-4858b24d6bce'));

function animalsOlderThan(animal, age) {
  // seu código aqui
}

function employeeByName(employeeName) {
  if (!employeeName) {
    return {};
  }
  const found = employees
  .find(element => element.firstName === employeeName || element.lastName === employeeName);
  return found;
  // seu código aqui
}
console.log(employeeByName());
console.log(employeeByName('Nigel'));

function createEmployee(personalInfo, associatedWith) {
  // seu código aqui
}

function isManager(id) {
  const trueOrFalse = employees
  .some(element => element.managers.includes(id));
  return trueOrFalse;
  // seu código aqui
}
console.log(isManager('b0dc644a-5335-489b-8a2c-4e086c7819a2'));
console.log(isManager('c5b83cb3-a451-49e2-ac45-ff3f54fbe7e1'));

function addEmployee(id, firstName, lastName, managers, responsibleFor) {
  // seu código aqui
}

function animalCount(species) {
  if (!species) {
    return {};
  }
  const number = animals.find(element => element.name === species);
  return number.residents.length;
}
console.log(animalCount('giraffes'));

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
