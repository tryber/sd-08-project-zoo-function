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
const { prices } = require('./data');
const data = require('./data');

const animalsByIds = (...ids) => animals.filter((element, index) => element.id === ids[index]);

const animalsOlderThan = (animal, age) => animals
.filter(filterElement => filterElement.name === animal)
.every(everyElement => everyElement.residents[0].age > age);

const employeeByName = employeeName => employees
.find(element => element.firstName === employeeName || element.lastName === employeeName) || {};

const createEmployee = (personalInfo, associatedWith) => ({ ...personalInfo, ...associatedWith });

const isManager = id => employees
.some(element => element.id === id && element.responsibleFor.length > 3);

const addEmployee = (id, firstName, lastName, managers = [], responsibleFor = []) => employees
.push({
  id,
  firstName,
  lastName,
  managers,
  responsibleFor,
});

const animalCount = (species) => {
  if (species !== undefined) {
    return animals.find(element => element.name === species).residents.length;
  }
  return animals.map(element => ({ [element.name]: element.residents.length }))
  .reduce((acc, curr) => Object.assign(acc, curr), {});
};

const entryCalculator = (entrants) => {
  if (entrants !== undefined) {
    return Object.entries(entrants)
    .reduce((acc, curr) => acc + (curr[1] * prices[curr[0]]), 0);
  }
  return 0;
};

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
