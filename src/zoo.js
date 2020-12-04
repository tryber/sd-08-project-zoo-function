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
const { animals } = require('./data');
const { employees } = require('./data');


function animalsByIds(...ids) {
  if (ids === undefined) return ([]);
  const allids = [];
  ids.forEach(identifier => allids.push(animals.find(element => element.id === identifier)));
  return allids;
}

function animalsOlderThan(animal, age) {
  const loco = animals.find(element => element.name === animal).residents;
  const mapear = loco.map(element => element.age);
  const verificar = mapear.every(element => element > age);
  return verificar;
}

function employeeByName(employeeName) {
  if (employeeName === undefined) return ({});
  let firstAndLast = employees.find(element => element.firstName === employeeName || element.lastName === employeeName);
  return firstAndLast;
}

console.log(employeeByName())
function createEmployee(personalInfo, associatedWith) {
  return {...personalInfo, ...associatedWith}
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
