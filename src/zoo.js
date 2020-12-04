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
const { employees } = require('./data');
const data = require('./data');

function animalsByIds(...ids) {
  const values = [];
  ids.forEach((element) => {
    values.push(animals.find(animal => animal.id === element));
  });
  return values;
}

function animalsOlderThan(animal, age) {
  let result;
  animals.filter((element) => {
    if (element.name === animal) {
      result = element.residents.every(elem => elem.age >= age);
    }
    return result;
  });
  return result;
}

function employeeByName(employeeName) {
  if (employeeName === undefined) {
    return {};
  }
  return employees.find(elem => elem.firstName === employeeName || elem.lastName === employeeName);
}

function createEmployee(personalInfo, associatedWith) {
  const newEmployee = Object.assign({}, personalInfo, associatedWith);
  return newEmployee;
}

function isManager(id) {
  let result = [];
  employees.forEach((elem) => {
    result.push(elem.managers);
    result = result.flat(Infinity);
  });
  return result.some(num => num === id);
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const obj = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  employees.push(obj);
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
