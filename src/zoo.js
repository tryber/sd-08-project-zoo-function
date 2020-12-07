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
  if (!ids) return [];
  return animals.filter(actua => actua.id === ids[0] || actua.id === ids[1]);
}


function animalsOlderThan(...ids) {
  return animals.find(tipobicho => tipobicho.name === ids[0])
  .residents.every(tipobicho => tipobicho.age >= 7);
}

function employeeByName(ids) {
  if (!ids) return {};
  return employees.find(func => func.firstName === ids || func.lastName === ids);
}

function createEmployee(...ids) {
  return {
    ...ids[0],
    ...ids[1],
  };
}

function isManager(...ids) {
  let trazid = employees.find((employ) => employ.managers );
  let arr = (trazid.managers);
  if (arr.some((str) => str === ids[0])) {
    return true;
  
  }  else {
       return false;
  }
}

function addEmployee(id, firstName, lastName, managers, responsibleFor) {
  data.employees = Object.assign({}, id, firstName, lastName, managers, responsibleFor);
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
