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
  // seu código aqui
  const arr = data.animals.filter(element => ids.includes(element.id));
  return arr;
}

function animalsOlderThan(animal, age) {
  // seu código aqui
  return data.animals
    .find(element => element.name === animal)
    .residents.every(element => element.age > age);
}

function employeeByName(employeeName) {
  // seu código aqui
  let result = data.employees
    .filter(element => element.firstName === employeeName || element.lastName === employeeName)[0];
  if (result === undefined) {
    result = {};
  }
  return result;
}

function createEmployee(personalInfo, associatedWith) {
  // seu código aqui
  return {
    ...personalInfo,
    ...associatedWith,
  };
}

function isManager(id) {
  // seu código aqui
  return data.employees.some(element => element.managers.includes(id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  // seu código aqui
  const employee = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  data.employees.push(employee);
}

function animalCount(species) {
  // seu código aqui
  const obj = {};
  data.animals.forEach((element) => {
    obj[element.name] = element.residents.length;
  });
  if (species === undefined) {
    return obj;
  }
  return obj[species];
}

function entryCalculator(entrants = {}) {
  // seu código aqui
  const ageRange = Object.keys(data.prices);
  const price = Object.values(data.prices);
  const people = Object.entries(entrants);
  return people
    .reduce((acc, element) => acc += (price[ageRange.indexOf(element[0])] * element[1]), 0);
}

console.log(data.prices)
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
