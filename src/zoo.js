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
const data2 = require('./data');

function animalsByIds(...ids) {
  if (ids.length === 0) return [];
  return animals.filter(({id}) => ids[0] === id || ids[1] === id);
}

function animalsOlderThan(animalType, ageTest) {
  let find = animals.find(({name}) => name === animalType);
  return find.residents.every(({age}) => age >= ageTest);
}

function employeeByName(...employeeName) {
  if (employeeName.length === 0) return {};
  let retorno = employees.find(({firstName, lastName}) => firstName === employeeName[0] || lastName === employeeName[0]);
  console.log(retorno);
  return retorno;
}
employeeByName('Emery');

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
